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
        <span>Make time for a good time.</span>
        <a href="/play?sport=football">Football <span aria-hidden="true">↗</span></a>
        <a href="/play?sport=cricket">Box cricket <span aria-hidden="true">↗</span></a>
        <a href="/play?sport=pickleball">Pickleball <span aria-hidden="true">↗</span></a>
        <a href="#the-cafe">The café <span aria-hidden="true">↓</span></a>
      </nav>
      <GroundSection />
      <WallSection />
      <CafeSection />
      <YourMoveSection />
    </main>
  );
}
