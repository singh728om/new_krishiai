"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Ramesh Patel / रमेश पटेल",
    location: "Wardha, Maharashtra",
    quote: "KrishiAI has changed how we farm. The disease scans saved my tomato crop this season when blight struck early.",
    hindi: "कृषि एआई ने हमारी खेती को बदल दिया है। ब्लाइट बीमारी के समय मेरे टमाटर की फसल बच गई।",
    initials: "RP"
  },
  {
    name: "Sukhwinder Singh / सुखविंदर सिंह",
    location: "Ludhiana, Punjab",
    quote: "Market Alpha predictions are scary accurate. I sold my wheat at a 20% higher price than my neighbors this year.",
    hindi: "मार्केट अल्फा की भविष्यवाणियां डरावनी रूप से सटीक हैं। मैंने इस साल अपनी गेहूं की फसल को ज्यादा दाम पर बेचा।",
    initials: "SS"
  },
  {
    name: "Anjali Devi / अंजली देवी",
    location: "Anantapur, Andhra Pradesh",
    quote: "The carbon credit income is real. I earned ₹12,000 just for maintaining my soil health as KrishiAI suggested.",
    hindi: "कार्बन क्रेडिट से होने वाली आय वास्तविक है। मुझे मिट्टी के स्वास्थ्य के लिए 12,000 रुपये मिले।",
    initials: "AD"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-krishi-mist grain">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-display text-krishi-cream text-center mb-16">Stories from the field.</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0F110D] p-8 rounded-3xl border border-krishi-cream/5 flex flex-col gap-6"
            >
              <div className="flex gap-1 text-krishi-gold">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}
              </div>
              
              <div className="space-y-4 flex-1">
                <p className="text-lg font-body leading-relaxed text-krishi-cream/90 italic">"{t.quote}"</p>
                <p className="text-sm font-body text-krishi-gold">{t.hindi}</p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-krishi-cream/5">
                <div className="w-12 h-12 rounded-full bg-krishi-soil flex items-center justify-center font-headline font-bold text-krishi-gold">
                   {t.initials}
                </div>
                <div>
                   <h4 className="font-headline font-bold text-sm">{t.name}</h4>
                   <p className="text-xs text-krishi-cream/40">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
