"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSettings } from "@/context/settings-context";

export const CtaSection = () => {
  const { lang } = useSettings();
  
  return (
    <section className="py-24 bg-background relative overflow-hidden border-t border-border">
      {/* Animated Background Blobs - Subtle for light mode */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.08, 0.03],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-krishi-gold rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.08, 0.03],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-krishi-lime rounded-full blur-[150px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-5xl md:text-7xl font-display text-foreground">
              {lang === 'en' ? "Start free." : "मुफ्त शुरू करें।"} <br />
              {lang === 'en' ? "Grow forever." : "हमेशा बढ़ें।"}
            </h2>
            <p className="text-xl text-foreground/60 font-body">
              {lang === 'en' ? "No credit card required. Works on any phone. Built for Bharat." : "क्रेडिट कार्ड की आवश्यकता नहीं। किसी भी फोन पर काम करता है। भारत के लिए निर्मित।"}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="p-1 rounded-[2.5rem] bg-gradient-to-r from-krishi-gold via-krishi-amber to-krishi-lime inline-block w-full max-w-lg shadow-xl"
          >
            <div className="bg-card rounded-[2.4rem] p-8 md:p-12 border border-border">
               <Link href="/login">
                 <Button className="bg-krishi-amber hover:bg-krishi-amber/90 text-white rounded-full w-full py-8 text-xl font-bold mb-6 transition-transform hover:scale-[1.02] shadow-lg shadow-krishi-amber/30">
                    {lang === 'en' ? "Start Growing Free" : "मुफ्त में शुरू करें"}
                 </Button>
               </Link>
               <Link href="/login">
                 <button className="text-foreground/60 font-headline font-bold uppercase tracking-widest text-xs hover:text-krishi-gold transition-colors">
                    {lang === 'en' ? "Already a member? Login →" : "पहले से सदस्य हैं? लॉगिन करें →"}
                 </button>
               </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
