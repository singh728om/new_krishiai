"use client";

import { CustomCursor } from "@/components/ui/custom-cursor";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { SocialProofBar } from "@/components/sections/social-proof";
import { FeatureGrid } from "@/components/sections/features";
import { WeatherIntelligence } from "@/components/sections/weather-intelligence";
import { DiagnosticsDemo } from "@/components/sections/diagnostics-demo";
import { LandLease } from "@/components/sections/land-lease";
import { HaritStore } from "@/components/sections/harit-store";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaSection } from "@/components/sections/cta-pricing";
import { Footer } from "@/components/sections/footer";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen">
      <CustomCursor />
      <Navbar />
      
      <Hero />
      <SocialProofBar />
      <FeatureGrid />
      <WeatherIntelligence />
      <DiagnosticsDemo />
      <LandLease />
      <HaritStore />
      <Stats />
      <Testimonials />
      <CtaSection />
      
      <Footer />
    </main>
  );
}