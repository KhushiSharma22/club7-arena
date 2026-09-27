import { test, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
const directory=mkdtempSync(join(tmpdir(),"club7-test-"));
process.env.CLUB7_DB_PATH=join(directory,"test.sqlite");
import {getDb} from "../src/lib/server/db";
import {createAdmin,login,sessionAdmin,logout,consumeRateLimit} from "../src/lib/server/auth";
import {createSlots,availableSlots,reserveSlot,updateBooking,updateSlot,listBookings} from "../src/lib/server/booking-store";
import {sameOrigin} from "../src/lib/server/http";
createAdmin("test@example.com","long-test-password-only");
const admin=(getDb().prepare("SELECT id FROM admins").get() as {id:string}).id;
const template={sport:"pickleball",resource:"Test court",from:"2099-01-01",to:"2099-01-01",start:"18:00",end:"20:00",duration:60,pricePaise:60000,maxPeople:4,weekdays:[0,1,2,3,4,5,6]};
function payload(slot: {id:string;version:number;pricePaise:number}){return {slotId:slot.id,expectedVersion:slot.version,expectedPricePaise:slot.pricePaise,name:"Test Player",email:"player@example.com",phone:"9999999999",people:4,notes:"",requestKey:randomUUID()};}
after(()=>{getDb().close();rmSync(directory,{recursive:true,force:true});});
test("staff sessions authenticate, expire and revoke",()=>{
 assert.equal(login("test@example.com","wrong"),null);
 const token=login("test@example.com","long-test-password-only")!;assert.equal(sessionAdmin(token)?.id,admin);
 logout(token);assert.equal(sessionAdmin(token),null);
 const expired=login("test@example.com","long-test-password-only")!;getDb().prepare("UPDATE sessions SET expiresAt = 0").run();assert.equal(sessionAdmin(expired),null);
 assert.equal(sessionAdmin("forged"),null);
});
test("weekly publishing respects weekdays, overlaps and shared resources",()=>{
 assert.deepEqual(createSlots(template,admin),{created:2,skipped:0});
 assert.deepEqual(createSlots({...template,sport:"football",resource:"TEST  COURT"},admin),{created:0,skipped:2});
 const result=createSlots({...template,resource:"Week court",to:"2099-01-07",weekdays:[1,3,5]},admin);assert.equal(result.created,6);
 assert.throws(()=>createSlots({...template,duration:90},admin));
 assert.throws(()=>createSlots({...template,from:"2099-02-30"},admin));
});
test("pending requests hold slots, retries are idempotent, approval preserves hold",()=>{
 const slot=availableSlots("pickleball","2099-01-01").find(s=>s.resource==="Test court")!;
 const data=payload(slot), receipt=reserveSlot(data);
 assert.equal(receipt.status,"pending");assert.equal(reserveSlot(data).id,receipt.id);
 assert.throws(()=>reserveSlot({...data,requestKey:randomUUID()}),/no longer available/);
 assert.throws(()=>reserveSlot({...data,name:"Changed"}),/Request changed/);
 assert.equal(availableSlots("pickleball","2099-01-01").some(s=>s.id===slot.id),false);
 assert.throws(()=>updateSlot({id:slot.id,state:"closed",pricePaise:60000,maxPeople:4},admin),/booked/);
 updateBooking({id:receipt.id,action:"approve"},admin);
 const booking=listBookings("2099-01-01","2099-01-01").find(b=>b.id===receipt.id)!;assert.equal(booking.status,"confirmed");assert.equal(booking.paymentStatus,"pending");
 updateBooking({id:receipt.id,action:"mark-paid"},admin);assert.equal(listBookings("2099-01-01","2099-01-01").find(b=>b.id===receipt.id)?.paymentStatus,"paid");
 updateBooking({id:receipt.id,action:"cancel"},admin);assert.equal(availableSlots("pickleball","2099-01-01").some(s=>s.id===slot.id),true);
 assert.throws(()=>updateBooking({id:receipt.id,action:"approve"},admin));
});
test("server rejects stale prices, over-capacity, closed and past slots",()=>{
 const slot=availableSlots("pickleball","2099-01-01").find(s=>s.resource==="Test court")!;
 assert.throws(()=>reserveSlot({...payload(slot),people:5}),/up to 4/);
 assert.throws(()=>reserveSlot({...payload(slot),expectedPricePaise:1}),/updated/);
 assert.throws(()=>reserveSlot({...payload(slot),email:"bad"}),/email/);
 updateSlot({id:slot.id,state:"closed",pricePaise:70000,maxPeople:4},admin);assert.throws(()=>reserveSlot(payload(slot)),/no longer available/);
 updateSlot({id:slot.id,state:"open",pricePaise:70000,maxPeople:4},admin);assert.throws(()=>reserveSlot(payload(slot)),/updated/);
 getDb().prepare("UPDATE slots SET startsAt = 1, endsAt = 2 WHERE id = ?").run(slot.id);assert.throws(()=>reserveSlot(payload(slot)),/no longer available/);
});
test("rate limits and same-origin mutation checks",()=>{
 assert.equal(consumeRateLimit("test",1,10000),true);assert.equal(consumeRateLimit("test",1,10000),false);
 assert.throws(()=>sameOrigin(new Request("http://localhost:3000/api/bookings",{method:"POST",headers:{origin:"https://evil.example","content-type":"application/json"}})),/origin/);
 sameOrigin(new Request("http://localhost:3000/api/bookings",{method:"POST",headers:{origin:"http://localhost:3000","content-type":"application/json"}}));
});
