"use client";

import { motion } from "framer-motion";
import { Sprout, Microscope, TrendingUp, CloudSun, Leaf, ShieldCheck } from "lucide-react";

const FeatureCard = ({
  title,
  description,
  icon,
  className,
  delay = 0,
  children
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  delay?: number;
  children?: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className={`group relative overflow-hidden rounded-[2rem] bg-card border border-border p-8 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 shadow-sm ${className}`}
  >
    <div className="mb-6 p-3 rounded-2xl bg-primary/5 w-fit text-primary group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-2xl font-headline font-bold text-foreground mb-2">{title}</h3>
    <p className="text-foreground/60 font-body leading-relaxed max-w-xs">{description}</p>
    {children}
    
    {/* Subtle hover glow */}
    <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.div>
);

export const FeatureGrid = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-display text-foreground">
            Everything your <span className="text-primary italic">farm</span> needs.
          </h2>
          <p className="text-foreground/40 font-body text-lg">Precision tools built for the modern Indian farmer.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - Disease Diagnostics */}
          <FeatureCard
            title="Disease Diagnostics"
            description="Instant leaf-level pathology using Gemini Vision AI. Identifies over 120+ crop diseases."
            className="lg:col-span-2"
            icon={<Microscope size={32} />}
          >
             <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border font-code text-[11px] space-y-2">
                <div className="flex justify-between items-center text-primary">
                   <span>SCANNING_LEAF...</span>
                   <span>97.2%</span>
                </div>
                <div className="w-full bg-foreground/5 h-1 rounded-full overflow-hidden">
                   <div className="bg-primary w-[97.2%] h-full" />
                </div>
                <div className="text-foreground/40">RESULT: EARLY BLIGHT (ALTERNARIA SOLANI)</div>
             </div>
          </FeatureCard>

          {/* Card 2 - Market Alpha */}
          <FeatureCard
            title="Market Alpha"
            description="Predict commodity price peaks 3 weeks ahead using global market data."
            icon={<TrendingUp size={32} />}
          >
             <div className="mt-6 font-code">
                <div className="text-krishi-amber text-lg font-bold">WHEAT ↑ ₹267 <span className="text-[10px] text-foreground/40 font-normal ml-1">EST. PEAK</span></div>
             </div>
          </FeatureCard>

          {/* Card 3 - Weather Guard */}
          <FeatureCard
            title="Weather Guard"
            description="Hyper-local 98% accuracy for your pincode. Built for monsoons."
            icon={<CloudSun size={32} />}
          />

          {/* Card 4 - Carbon Economy */}
          <FeatureCard
            title="Carbon Economy"
            description="Monetize soil health. Earn credits automatically by maintaining soil organic carbon."
            icon={<Leaf size={32} />}
          >
             <div className="mt-4 text-primary font-headline font-bold">₹4,820 EARNED</div>
          </FeatureCard>

          {/* Card 5 - Village Networks */}
          <FeatureCard
            title="FPO Connect"
            description="Connect with local Farmer Producer Organizations for better bargaining power."
            icon={<Sprout size={32} />}
          />

          {/* Card 6 - Secure Data */}
          <FeatureCard
            title="Certified Safe"
            description="End-to-end encrypted. Your field data belongs only to you."
            icon={<ShieldCheck size={32} />}
          />
        </div>
      </div>
    </section>
  );
};