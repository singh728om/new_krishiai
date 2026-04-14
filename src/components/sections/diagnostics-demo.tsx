"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SAMPLES = [
  { id: "tomato", name: "Tomato", color: "bg-red-500", issue: "Early Blight (Alternaria solani)", confidence: 94.7, severity: "MODERATE", cure: "Spray Mancozeb 75% WP @ 2g/L", hindi: "मैनकोज़ेब 75% WP छिड़कें — 2 ग्राम प्रति लीटर पानी" },
  { id: "wheat", name: "Wheat", color: "bg-amber-600", issue: "Yellow Rust (Puccinia striiformis)", confidence: 98.1, severity: "HIGH", cure: "Apply Propiconazole 25 EC @ 1ml/L", hindi: "प्रोपिकोनाज़ोल 25 EC लगाएं — 1 मिली प्रति लीटर" },
  { id: "cotton", name: "Cotton", color: "bg-krishi-cream", issue: "Healthy Leaf", confidence: 99.4, severity: "LOW", cure: "No treatment needed. Maintain irrigation.", hindi: "इलाज की आवश्यकता नहीं है। सिंचाई बनाए रखें।" },
];

export const DiagnosticsDemo = () => {
  const [activeSample, setActiveSample] = useState<typeof SAMPLES[0] | null>(null);

  return (
    <section className="py-24 bg-krishi-black border-y border-krishi-cream/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Mobile Mock */}
          <div className="flex justify-center">
            <div className="w-full max-w-[320px] aspect-[9/18] bg-black rounded-[3rem] border-8 border-[#1A1A1A] relative shadow-2xl overflow-hidden">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-[#1A1A1A] rounded-b-2xl z-20" />
               
               <div className="p-6 pt-12 flex flex-col h-full bg-[#0A0A08]">
                  <h4 className="font-headline font-bold text-lg mb-4">Leaf Analysis</h4>
                  
                  <div className="flex-1 border-2 border-dashed border-krishi-cream/10 rounded-2xl flex flex-col items-center justify-center p-4 text-center">
                    {!activeSample ? (
                      <>
                        <div className="w-12 h-12 bg-krishi-cream/5 rounded-full flex items-center justify-center mb-2">
                           <span className="text-xl">📸</span>
                        </div>
                        <p className="text-xs text-krishi-cream/40">Select a sample below to simulate upload</p>
                      </>
                    ) : (
                      <div className={`w-full h-full rounded-xl ${activeSample.color} opacity-20 animate-pulse`} />
                    )}
                  </div>

                  <div className="mt-6">
                    <p className="text-[10px] text-krishi-cream/30 uppercase tracking-widest mb-3">Sample Crops</p>
                    <div className="flex gap-3">
                      {SAMPLES.map(sample => (
                        <button
                          key={sample.id}
                          onClick={() => setActiveSample(sample)}
                          className={`flex-1 aspect-square rounded-xl border ${activeSample?.id === sample.id ? 'border-krishi-gold' : 'border-krishi-cream/5'} transition-all flex flex-col items-center justify-center gap-1 group`}
                        >
                          <div className={`w-4 h-4 rounded-full ${sample.color} group-hover:scale-110 transition-transform`} />
                          <span className="text-[10px] text-krishi-cream/60">{sample.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Right: AI Result */}
          <div className="space-y-8">
             <div className="space-y-4">
               <h2 className="text-4xl md:text-5xl font-display text-krishi-cream">Instant Pathology.</h2>
               <p className="text-lg text-krishi-cream/60 font-body">Gemini-powered vision analysis provides clinical-grade diagnosis in under 3 seconds.</p>
             </div>

             <AnimatePresence mode="wait">
               {activeSample ? (
                 <motion.div
                   key={activeSample.id}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="p-8 rounded-2xl bg-[#0F110D] border border-krishi-gold/20 shadow-xl font-code"
                 >
                    <div className="flex justify-between items-start mb-6">
                       <div>
                          <p className="text-[10px] text-krishi-cream/40 uppercase tracking-widest">DIAGNOSIS_RESULT</p>
                          <h3 className="text-2xl font-bold text-krishi-cream mt-1">{activeSample.issue}</h3>
                       </div>
                       <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full animate-pulse ${activeSample.severity === 'HIGH' ? 'bg-red-500' : activeSample.severity === 'MODERATE' ? 'bg-krishi-amber' : 'bg-krishi-lime'}`} />
                          <span className="text-xs uppercase font-bold tracking-tighter">{activeSample.severity}</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                       <div className="bg-krishi-cream/5 p-4 rounded-xl">
                          <p className="text-[10px] text-krishi-cream/40 mb-1">CROP_TYPE</p>
                          <p className="text-sm font-bold">{activeSample.name}</p>
                       </div>
                       <div className="bg-krishi-cream/5 p-4 rounded-xl">
                          <p className="text-[10px] text-krishi-cream/40 mb-1">CONFIDENCE</p>
                          <p className="text-sm font-bold text-krishi-gold">{activeSample.confidence}%</p>
                       </div>
                    </div>

                    <div className="space-y-4 border-t border-krishi-cream/5 pt-6">
                       <div>
                          <p className="text-[10px] text-krishi-cream/40 uppercase mb-2">Recommended Cure</p>
                          <p className="text-sm leading-relaxed">{activeSample.cure}</p>
                       </div>
                       <div>
                          <p className="text-[10px] text-krishi-cream/40 uppercase mb-2">सिफ़ारिश (HINDI)</p>
                          <p className="text-sm leading-relaxed text-krishi-gold font-medium">{activeSample.hindi}</p>
                       </div>
                    </div>

                    <div className="mt-8 flex items-center gap-2 text-[10px] text-krishi-cream/30">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                       Powered by Gemini Vision AI
                    </div>
                 </motion.div>
               ) : (
                 <div className="p-8 rounded-2xl border border-dashed border-krishi-cream/10 flex flex-col items-center justify-center text-center text-krishi-cream/30 min-h-[300px]">
                    <span className="text-4xl mb-4">🔬</span>
                    <p className="font-headline">Select a sample crop to see AI results</p>
                 </div>
               )}
             </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
