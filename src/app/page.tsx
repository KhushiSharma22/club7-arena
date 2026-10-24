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
        <a href="/play?sport=cricket">BOX CRICKET <span aria-hidden="true">↗</span></a>
        <a href="/play?sport=football">FOOTBALL <span aria-hidden="true">↗</span></a>
        <a href="/play?sport=pickleball">PICKLEBALL <span aria-hidden="true">↗</span></a>
        <a href="#the-cafe">THE CAFÉ <span aria-hidden="true">↓</span></a>
      </nav>
      <GroundSection />
      <WallSection />
      <CafeSection />
      <YourMoveSection />
    </main>
  );
}
