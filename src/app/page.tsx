import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Services } from "@/components/home/Services";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Testimonials } from "@/components/home/Testimonials";
import { DevExperience } from "@/components/home/DevExperience";
import { WhyHttpier } from "@/components/home/WhyHttpier";
import { ResponsiveShowcase } from "@/components/home/ResponsiveShowcase";
import { Process } from "@/components/home/Process";
import { TechStack } from "@/components/home/TechStack";
import { Performance } from "@/components/home/Performance";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <FeaturedWork />
      <Testimonials />
      <DevExperience />
      <WhyHttpier />
      <ResponsiveShowcase />
      <Process />
      <TechStack />
      <Performance />
      <AboutTeaser />
      <CTASection />
    </>
  );
}
