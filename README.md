This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Staff portal and bookings

`/admin` is the staff dashboard; `/admin/login` provides sign-in. Staff publish a single day or a range of up to 90 days, choosing weekdays, court/turf name, time window, slot duration, full INR price and group limit. Use identical court/turf names for sports sharing an area: overlaps are prevented across sports. Closed slots also retain their time/area.

The public `/play` page fetches database inventory every 15 seconds. New requests hold their slot with **pending** status until staff approve or decline them. Holds do not expire automatically. Declining/cancelling releases a future open slot. Staff can edit price/capacity or close/reopen unreserved future slots. To change a time, close the old slot and publish a nonoverlapping new slot.

Payments are recorded manually after approval. No gateway charge, refund, email or SMS is triggered; contact customers directly. Handle any refund separately if cancelling a paid booking.

### Staff setup

Run `npm run admin:create -- your-email@example.com`. A strong generated password is saved to a private, ignored `.data/admin-*.txt` file. Store it in a password manager and delete the credential file. Repeat with another email for additional staff, all of whom currently have equal permissions. There is no public registration or password reset UI. `ADMIN_PASSWORD` may optionally be supplied through a secure environment; never commit credentials.

### Storage and hosting

SQLite persists in `.data/club7.sqlite`, or the absolute `CLUB7_DB_PATH`. Customer data, sessions, audit logs and credential files stay out of Git. Back up through SQLite's backup facilities, or stop the application before copying the database and WAL files together.

This backend requires a **Node server with a persistent disk**, one shared database file and production HTTPS. It is not suitable for an ephemeral Vercel/serverless filesystem; a guard prevents that deployment. Migrate to a managed database before deploying across serverless instances. Set `APP_ORIGIN` to your exact public origin when running behind a proxy. Staff cookies are HttpOnly/SameSite Strict, expire after 12 hours and require HTTPS in production.

Before launching, configure hosting, real accounts/rates, customer notifications and payment collection. Database-backed rate limits protect login and booking endpoints, but customer email/phone ownership is not verified. Staff mutations are recorded in the database's audit table.

### Checks

Run `npm run lint`, `npm test` and `npm run build -- --webpack`. Tests use a separate temporary database and cover authentication, overlaps, repeating schedules, pending holds, idempotency, stale pricing, capacity, approval, cancellation and origin/rate-limit checks.
