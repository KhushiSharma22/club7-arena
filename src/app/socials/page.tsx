import type { Metadata } from "next";
import SocialView from "@/components/discover/SocialView";
import "@/styles/discover.css";
export const metadata: Metadata = { title: "Socials", description: "The social side of Club 7. Courtside moments, nights under the lights and a closer look at our arena." };
export default function SocialsPage() { return <SocialView />; }
