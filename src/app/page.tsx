import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyHttpier } from "@/components/home/WhyHttpier";
import { ResponsiveShowcase } from "@/components/home/ResponsiveShowcase";
import { Process } from "@/components/home/Process";
import { TechStack } from "@/components/home/TechStack";
import { Performance } from "@/components/home/Performance";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Testimonials />
      <FeaturedWork />
      <WhyHttpier />
      <ResponsiveShowcase />
      <Process />
      <TechStack />
      <Performance />
      <CTASection />
    </>
  );
}
