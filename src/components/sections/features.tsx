"use client";

import { motion } from "framer-motion";

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
    className={`group relative overflow-hidden rounded-2xl bg-[#0F110D] border border-krishi-cream/5 p-8 hover:border-krishi-lime/30 transition-all duration-500 hover:-translate-y-1 ${className}`}
  >
    <div className="mb-6">{icon}</div>
    <h3 className="text-2xl font-headline font-bold text-krishi-cream mb-2">{title}</h3>
    <p className="text-krishi-cream/60 font-body leading-relaxed max-w-xs">{description}</p>
    {children}
    
    {/* Subtle hover glow */}
    <div className="absolute inset-0 bg-gradient-to-tr from-krishi-lime/0 via-krishi-lime/0 to-krishi-lime/5 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.div>
);

export const FeatureGrid = () => {
  return (
    <section id="features" className="py-24 bg-krishi-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display text-krishi-cream">
            <span className="relative">
              Everything
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-krishi-gold rounded-full" />
            </span> your farm needs. Nothing it doesn't.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - Disease Diagnostics */}
          <FeatureCard
            title="Disease Diagnostics"
            description="Instant leaf-level pathology using Gemini Vision AI."
            className="lg:col-span-2"
            icon={
              <svg width="40" height="40" viewBox="0 0 40 40" className="text-krishi-lime">
                <path d="M20 5L25 15H15L20 5Z" fill="currentColor" />
                <path d="M10 35C10 25 15 20 20 20C25 20 30 25 30 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <rect x="5" y="12" width="30" height="1" className="animate-pulse" fill="currentColor" />
              </svg>
            }
          >
             <div className="mt-8 p-4 rounded-xl bg-krishi-black border border-krishi-cream/5 font-code text-[11px] space-y-2">
                <div className="flex justify-between items-center text-krishi-lime">
                   <span>SCANNING_LEAF...</span>
                   <span>97.2%</span>
                </div>
                <div className="w-full bg-krishi-cream/5 h-1 rounded-full overflow-hidden">
                   <div className="bg-krishi-lime w-[97.2%] h-full" />
                </div>
                <div className="text-krishi-cream/40">RESULT: EARLY BLIGHT (ALTERNARIA SOLANI)</div>
             </div>
          </FeatureCard>

          {/* Card 2 - Market Alpha */}
          <FeatureCard
            title="Market Alpha"
            description="Predict commodity price peaks 3 weeks ahead."
            icon={
              <svg width="40" height="40" viewBox="0 0 40 40" className="text-krishi-amber">
                <path d="M5 35L15 20L25 25L35 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            }
          >
             <div className="mt-6 font-code">
                <div className="text-krishi-amber text-lg font-bold">WHEAT ↑ ₹267 <span className="text-[10px] text-krishi-cream/40 font-normal ml-1">EST. PEAK</span></div>
             </div>
          </FeatureCard>

          {/* Card 3 - Weather Guard */}
          <FeatureCard
            title="Weather Guard"
            description="Hyper-local 98% accuracy for your pincode."
            icon={
              <svg width="40" height="40" viewBox="0 0 40 40" className="text-blue-400">
                <circle cx="20" cy="15" r="8" fill="currentColor" opacity="0.2" />
                {[1,2,3,4].map(i => (
                  <circle key={i} cx={12 + i*4} cy={25 + (i%2)*4} r="1" className="animate-bounce" style={{ animationDelay: `${i*0.2}s` }} fill="currentColor" />
                ))}
              </svg>
            }
          />

          {/* Card 4 - Carbon Economy */}
          <FeatureCard
            title="Carbon Economy"
            description="Monetize soil health. Earn credits automatically."
            icon={
              <svg width="40" height="40" viewBox="0 0 40 40" className="text-krishi-gold">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" strokeDasharray="100 20" fill="none" />
                <path d="M20 12V28M15 15H25M15 25H25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            }
          >
             <div className="mt-4 text-krishi-gold font-headline font-bold">₹4,820 EARNED</div>
          </FeatureCard>

          {/* Card 5 - FPO Global */}
          <FeatureCard
            title="FPO Global"
            description="Unified dashboard for cooperatives at scale."
            icon={
               <svg width="40" height="40" viewBox="0 0 40 40" className="text-krishi-mist">
                  <circle cx="20" cy="20" r="3" fill="currentColor" />
                  <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.5" />
                  <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.5" />
                  <line x1="10" y1="10" x2="20" y2="20" stroke="currentColor" strokeWidth="1" />
                  <line x1="20" y1="20" x2="30" y2="30" stroke="currentColor" strokeWidth="1" />
               </svg>
            }
          />

          {/* Card 6 - Certified Safe */}
          <FeatureCard
            title="Certified Safe"
            description="End-to-end encrypted. Your data belongs to you."
            icon={
              <svg width="40" height="40" viewBox="0 0 40 40" className="text-krishi-cream/40">
                <rect x="10" y="15" width="20" height="15" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M15 15V10C15 7.23858 17.2386 5 20 5C22.7614 5 25 7.23858 25 10V15" stroke="currentColor" strokeWidth="2" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
};
