"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const PRODUCTS = [
  { name: "Organic Cherry Tomatoes", price: 180, rating: 4.9, cluster: "Wardha", color: "from-red-600/10 to-orange-600/10" },
  { name: "Premium Basmati Rice", price: 245, rating: 4.8, cluster: "Nagpur", color: "from-yellow-600/10 to-krishi-gold/10" },
  { name: "Pure Turmeric Powder", price: 320, rating: 5.0, cluster: "Vidarbha", color: "from-amber-600/10 to-krishi-gold/10" },
  { name: "Sun-dried Wheat", price: 120, rating: 4.7, cluster: "Rajasthan", color: "from-orange-600/10 to-krishi-soil/10" },
];

export const HaritStore = () => {
  return (
    <section id="store" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
           <div className="max-w-xl space-y-4">
              <h2 className="text-4xl md:text-5xl font-display text-foreground">Harit Store.</h2>
              <p className="text-xl text-foreground/60 font-body">Fresh from leased farms. Traceable. Organic. Delivered directly from Bharat's heartland.</p>
           </div>
           <Button variant="link" className="text-krishi-gold font-headline font-bold text-lg p-0 hover:no-underline hover:text-krishi-gold/80">
              View All Products →
           </Button>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="min-w-[300px] flex-1 group bg-card rounded-3xl border border-border overflow-hidden transition-all hover:border-krishi-gold/30 shadow-sm"
            >
               <div className={`h-48 bg-gradient-to-br ${product.color} relative overflow-hidden`}>
                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md border border-border px-3 py-1 rounded-full text-[10px] font-headline font-bold text-krishi-gold uppercase tracking-widest">
                     {product.cluster} Cluster
                  </div>
                  {/* Abstract SVG patterns instead of images */}
                  <svg className="absolute bottom-0 right-0 w-2/3 h-2/3 opacity-20 text-foreground" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" fill="none" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" strokeWidth="0.5" />
                    <path d="M50 10V90M10 50H90" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
               </div>
               
               <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline font-bold text-lg leading-tight group-hover:text-krishi-gold transition-colors">{product.name}</h3>
                    <div className="flex items-center gap-1 text-krishi-gold">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold">{product.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl font-display text-foreground">₹{product.price}</span>
                    <Button className="bg-krishi-lime hover:bg-krishi-lime/90 text-white rounded-full px-6 font-bold shadow-md shadow-krishi-lime/20">
                       Buy Now
                    </Button>
                  </div>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};