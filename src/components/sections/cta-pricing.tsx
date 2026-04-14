"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const CtaSection = () => {
  return (
    <section className="py-24 bg-krishi-black relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-krishi-gold rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
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
            <h2 className="text-5xl md:text-7xl font-display text-krishi-cream">Start free. <br />Grow forever.</h2>
            <p className="text-xl text-krishi-cream/60 font-body">No credit card required. Works on any phone. Built for Bharat.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="p-1 rounded-[2.5rem] bg-gradient-to-r from-krishi-gold via-krishi-amber to-krishi-lime inline-block w-full max-w-lg"
          >
            <div className="bg-krishi-black rounded-[2.4rem] p-8 md:p-12">
               <Button className="bg-krishi-amber hover:bg-krishi-amber/90 text-white rounded-full w-full py-8 text-xl font-bold mb-6 transition-transform hover:scale-[1.02]">
                  Start Growing Free — It's Free
               </Button>
               <button className="text-krishi-cream/60 font-headline font-bold uppercase tracking-widest text-xs hover:text-krishi-gold transition-colors">
                  Already a member? Login →
               </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
