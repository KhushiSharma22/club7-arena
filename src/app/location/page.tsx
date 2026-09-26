import type { Metadata } from "next";
import LocationView from "@/components/discover/LocationView";
import "@/styles/discover.css";
export const metadata: Metadata = { title: "Location", description: "Find Club 7 Arena in Sector 89, Faridabad. Explore the map, recognise the entrance and plan your visit." };
export default function LocationPage() { return <LocationView />; }
