
"use client";

import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useSettings } from "@/context/settings-context";
import Link from "next/link";

export const HaritStore = () => {
  const { lang } = useSettings();

  const labels = {
    title: lang === 'en' ? 'Harit Store.' : 'हरित स्टोर।',
    subtitle: lang === 'en' 
      ? "Fresh from leased farms. Traceable. Organic. Delivered directly from Bharat's heartland."
      : "लीज़ पर लिए गए खेतों से ताज़ा। ऑर्गेनिक। सीधे भारत के हृदय स्थल से पहुँचाया गया।",
    viewAll: lang === 'en' ? 'View All Products →' : 'सभी उत्पाद देखें →',
    buyNow: lang === 'en' ? 'Buy Now' : 'अभी खरीदें',
    cluster: lang === 'en' ? 'Cluster' : 'क्लस्टर'
  };

  const products = [
    { 
      id: "tomato",
      name: lang === 'en' ? "Organic Cherry Tomatoes" : "ऑर्गेनिक चेरी टमाटर", 
      price: 180, 
      rating: 4.9, 
      cluster: "Wardha"
    },
    { 
      id: "mango",
      name: lang === 'en' ? "Alphonso Mangoes" : "हापुस आम", 
      price: 1200, 
      rating: 5.0, 
      cluster: "Ratnagiri" 
    },
    { 
      id: "ghee",
      name: lang === 'en' ? "A2 Desi Cow Ghee" : "ए2 देसी गाय का घी", 
      price: 850, 
      rating: 4.9, 
      cluster: "Nagpur" 
    },
    { 
      id: "honey",
      name: lang === 'en' ? "Wild Forest Honey" : "जंगल का शहद", 
      price: 450, 
      rating: 4.8, 
      cluster: "Vidarbha" 
    },
  ];

  return (
    <section id="store" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
           <div className="max-w-xl space-y-4">
              <h2 className="text-4xl md:text-6xl font-display text-foreground">{labels.title}</h2>
              <p className="text-xl text-foreground/60 font-body">{labels.subtitle}</p>
           </div>
           <Link href="/products">
             <Button variant="link" className="text-primary font-headline font-bold text-lg p-0 hover:no-underline hover:text-primary/80">
                {labels.viewAll}
             </Button>
           </Link>
        </div>

        <div className="flex gap-8 overflow-x-auto pb-12 snap-x scrollbar-hide">
          {products.map((product) => {
            const imageData = PlaceHolderImages.find(img => img.id === product.id);
            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -10 }}
                className="min-w-[320px] snap-center group bg-card rounded-[2rem] border border-border overflow-hidden transition-all hover:border-primary/40 shadow-sm hover:shadow-xl"
              >
                 <div className="h-64 relative overflow-hidden bg-muted">
                    {imageData && (
                      <Image
                        src={imageData.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        data-ai-hint={imageData.imageHint}
                      />
                    )}
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md border border-border px-4 py-1.5 rounded-full text-[10px] font-headline font-bold text-primary uppercase tracking-widest shadow-sm">
                       {product.cluster} {labels.cluster}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                 </div>
                 
                 <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <h3 className="font-headline font-bold text-xl leading-tight text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-krishi-gold bg-krishi-gold/5 px-2 py-1 rounded-lg">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm font-bold">{product.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs text-foreground/40 font-medium">Price</span>
                        <span className="text-3xl font-display text-foreground">₹{product.price}</span>
                      </div>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 h-auto font-bold shadow-lg shadow-primary/20 flex gap-2">
                         <ShoppingCart size={18} />
                         {labels.buyNow}
                      </Button>
                    </div>
                 </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
