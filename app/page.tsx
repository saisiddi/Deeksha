import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { LazyPosterCarousel } from "@/components/LazyPosterCarousel";
import { Events } from "@/components/Events";
import { Timeline } from "@/components/Timeline";
import { Awards } from "@/components/Awards";
import { LazyCoordinators } from "@/components/LazyCoordinators";
import { JudgingPanel } from "@/components/JudgingPanel";
import { TeamMessage } from "@/components/TeamMessage";
import { Footer } from "@/components/Footer";
import { PrizeBanner } from "@/components/PrizeBanner";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <LazyPosterCarousel />
        <Events />
        <Timeline />
        <Awards />
        <LazyCoordinators />
        <JudgingPanel />
        <TeamMessage />
      </main>
      <Footer />
      <PrizeBanner />
    </>
  );
}
