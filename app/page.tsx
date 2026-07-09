import { HeroSection } from "@/components/hero-section";
import { PortfolioSection } from "@/components/portfolio-section";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PortfolioSection />
    </main>
  );
}
