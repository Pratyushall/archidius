import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { PhilosophySection } from "@/components/philosophy-section";
import { FeaturedProjects } from "@/components/featured-projects";
import { InnovationSection } from "@/components/innovation-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <PhilosophySection />
      <FeaturedProjects />

      <Footer />
    </main>
  );
}
