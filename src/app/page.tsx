import HomeCoaching from "@/components/academy/HomeCoaching";
import Hero from "@/components/hero/Hero";
import GroundSection from "@/components/ground/GroundSection";
import WallSection from "@/components/wall/WallSection";
import CafeSection from "@/components/night/CafeSection";
import YourMoveSection from "@/components/move/YourMoveSection";

export default function Home() {
  return (
    <main className="home-page">
      <Hero />
      <nav className="home-directory" aria-label="Explore Club 7">
        <a className="home-sport-highlight" href="/play?sport=cricket">BOX CRICKET <span aria-hidden="true">↗</span></a>
        <a className="home-sport-highlight" href="/play?sport=football">FOOTBALL <span aria-hidden="true">↗</span></a>
        <a className="home-sport-highlight" href="/play?sport=pickleball">PICKLEBALL <span aria-hidden="true">↗</span></a>
        <a className="home-sport-highlight" href="#the-cafe">THE CAFÉ <span aria-hidden="true">↓</span></a>
        <a className="home-sport-highlight home-academy-link" href="/academy">ACADEMY <span aria-hidden="true">↗</span></a>
      </nav>
      <GroundSection />
      <HomeCoaching />
      <WallSection />
      <CafeSection />
      <YourMoveSection />
    </main>
  );
}
