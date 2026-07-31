import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Events } from "@/components/Events";
import { Timeline } from "@/components/Timeline";
import { Awards } from "@/components/Awards";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Coordinators } from "@/components/Coordinators";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Events />
        <Timeline />
        <Awards />
        <RegistrationForm />
        <Coordinators />
      </main>
      <Footer />
    </>
  );
}
