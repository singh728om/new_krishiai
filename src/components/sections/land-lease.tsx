
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import Link from "next/link";

export const LandLease = () => {
  return (
    <section id="lease" className="py-24 bg-secondary/30 overflow-hidden grain">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-5xl md:text-6xl font-display text-foreground leading-[1.1]">
                Apni khaali zameen se <br />
                <span className="text-krishi-gold">Guaranteed Income</span> pao.
              </h2>
              <p className="text-xl text-foreground/60 font-body">We lease your fallow land, deploy AI-managed organic farming, and pay you monthly credits above market rate.</p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {["Zero Work", "Soil Health", "Legal Safety", "Advance Payment"].map((feat, i) => (
                <motion.div
                  key={feat}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border py-4 px-6 rounded-xl text-sm font-headline font-bold uppercase tracking-wider text-krishi-gold flex items-center justify-center text-center"
                >
                  {feat}
                </motion.div>
              ))}
            </div>

            <Link href="/lease-registration">
              <Button className="bg-krishi-amber hover:bg-krishi-amber/90 text-white rounded-full px-10 h-16 text-lg font-bold w-full sm:w-auto shadow-lg shadow-krishi-amber/20">
                Lease My Land Now →
              </Button>
            </Link>
          </div>

          <div className="relative">
             <motion.div
               initial={{ opacity: 0, rotate: -5, y: 40 }}
               whileInView={{ opacity: 1, rotate: 0, y: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
               className="bg-card p-8 rounded-3xl border border-border shadow-2xl relative z-10"
             >
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-3 h-3 bg-krishi-lime rounded-full animate-pulse" />
                   <span className="text-xs font-headline font-bold text-krishi-lime uppercase tracking-widest">Active Lease Cluster</span>
                </div>
                
                <h3 className="text-2xl font-headline font-bold mb-2">Wardha Cluster #04</h3>
                <p className="text-foreground/60 text-sm mb-6">Growing Organic Cherry Tomatoes for Global Export</p>
                
                <div className="space-y-6">
                   <div>
                      <div className="flex justify-between text-xs mb-2 text-foreground/40 font-code">
                         <span>SEASON PROGRESS</span>
                         <span>60%</span>
                      </div>
                      <div className="w-full bg-foreground/5 h-1.5 rounded-full overflow-hidden">
                         <div className="bg-krishi-gold w-[60%] h-full rounded-full" />
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="bg-muted/50 p-4 rounded-xl border border-border">
                         <p className="text-[10px] text-foreground/40 mb-1">AREA SIZE</p>
                         <p className="text-sm font-bold">12.5 Acres</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-xl border border-border">
                         <p className="text-[10px] text-foreground/40 mb-1">SOIL_STATUS</p>
                         <p className="text-sm font-bold text-krishi-lime">OPTIMAL</p>
                      </div>
                   </div>
                </div>
             </motion.div>
             
             {/* Decorative leaf floating */}
             <div className="absolute -top-12 -right-12 w-32 h-32 text-krishi-lime opacity-10 rotate-45">
                <Leaf size={128} />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
