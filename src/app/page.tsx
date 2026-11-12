import { AboutSection } from "@/components/AboutSection";
import { CategoryMarquee } from "@/components/CategoryMarquee";
import { Footer } from "@/components/Footer";
import { GetStartedSection } from "@/components/GetStartedSection";
import { HeroCarousel } from "@/components/HeroCarousel";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ManufacturersSection } from "@/components/ManufacturersSection";
import { Navbar } from "@/components/Navbar";
import { PrivacyTrustSection } from "@/components/PrivacyTrustSection";
import { ResultsSection } from "@/components/ResultsSection";

const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroCarousel />
        <CategoryMarquee />
        <AboutSection />
        <HowItWorksSection />
        <ResultsSection />
        <ManufacturersSection />
        <PrivacyTrustSection />
        <GetStartedSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
