
"use client";

import { motion } from "framer-motion";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useSettings } from "@/context/settings-context";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import Link from "next/link";
import { useState } from "react";

const CATEGORIES = [
  { id: "all", nameEn: "All Products", nameHi: "सभी उत्पाद" },
  { id: "veggies", nameEn: "Vegetables", nameHi: "सब्जियां" },
  { id: "fruits", nameEn: "Fruits", nameHi: "फल" },
  { id: "grains", nameEn: "Grains & Pulses", nameHi: "अनाज और दालें" },
  { id: "oils", nameEn: "Oils & Ghee", nameHi: "तेल और घी" },
  { id: "honey", nameEn: "Honey", nameHi: "शहद" },
];

const ALL_PRODUCTS = [
  { id: "tomato", cat: "veggies", nameEn: "Organic Cherry Tomatoes", nameHi: "ऑर्गेनिक चेरी टमाटर", price: 180, rating: 4.9, cluster: "Wardha" },
  { id: "mango", cat: "fruits", nameEn: "Alphonso Mangoes", nameHi: "हापुस आम", price: 1200, rating: 5.0, cluster: "Ratnagiri" },
  { id: "rice", cat: "grains", nameEn: "Premium Basmati Rice", nameHi: "प्रीमियम बासमती चावल", price: 245, rating: 4.8, cluster: "Nagpur" },
  { id: "wheat", cat: "grains", nameEn: "Sun-dried Wheat", nameHi: "धूप में सुखाया गया गेहूं", price: 120, rating: 4.7, cluster: "Rajasthan" },
  { id: "oil", cat: "oils", nameEn: "Cold-pressed Mustard Oil", nameHi: "कोल्ड-प्रेस्ड सरसों का तेल", price: 320, rating: 4.9, cluster: "Punjab" },
  { id: "honey", cat: "honey", nameEn: "Wild Forest Honey", nameHi: "जंगल का शहद", price: 450, rating: 4.8, cluster: "Vidarbha" },
  { id: "dal", cat: "grains", nameEn: "Organic Toor Dal", nameHi: "ऑर्गेनिक अरहर दाल", price: 210, rating: 4.6, cluster: "Amravati" },
  { id: "ghee", cat: "oils", nameEn: "A2 Desi Cow Ghee", nameHi: "ए2 देसी गाय का घी", price: 850, rating: 4.9, cluster: "Nagpur" },
  { id: "turmeric", cat: "grains", nameEn: "Pure Turmeric Powder", nameHi: "शुद्ध हल्दी पाउडर", price: 150, rating: 5.0, cluster: "Wardha" },
];

export default function ProductsPage() {
  const { lang } = useSettings();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = activeCategory === "all" 
    ? ALL_PRODUCTS 
    : ALL_PRODUCTS.filter(p => p.cat === activeCategory);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <section className="flex-1 py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <Link href="/" className="text-primary hover:text-primary/80 flex items-center gap-2 mb-4 font-medium">
              <ArrowLeft size={16} />
              {lang === 'en' ? "Back to Home" : "होम पर वापस"}
            </Link>
            <h1 className="text-4xl md:text-6xl font-display text-foreground">
              {lang === 'en' ? "Harit" : "हरित"} <span className="text-primary italic">{lang === 'en' ? "Marketplace" : "बाज़ार"}</span>
            </h1>
            <p className="text-xl text-foreground/60 font-body mt-2">
              {lang === 'en' ? "Clinical-grade organic produce, direct from village clusters." : "गांव के समूहों से सीधे, क्लिनिकल-ग्रेड जैविक उपज।"}
            </p>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-8 mb-8 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-headline font-bold text-sm whitespace-nowrap transition-all border ${
                activeCategory === cat.id 
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                : "bg-card text-foreground/60 border-border hover:border-primary/40"
              }`}
            >
              {lang === 'en' ? cat.nameEn : cat.nameHi}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const imageData = PlaceHolderImages.find(img => img.id === product.id);
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                key={product.id}
                className="bg-card rounded-[2rem] border border-border overflow-hidden transition-all hover:border-primary/40 shadow-sm hover:shadow-xl group"
              >
                <div className="h-56 relative overflow-hidden bg-muted">
                  {imageData && (
                    <Image
                      src={imageData.imageUrl}
                      alt={lang === 'en' ? product.nameEn : product.nameHi}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      data-ai-hint={imageData.imageHint}
                    />
                  )}
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md border border-border px-4 py-1.5 rounded-full text-[10px] font-headline font-bold text-primary uppercase tracking-widest shadow-sm">
                    {product.cluster} Cluster
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline font-bold text-lg leading-tight text-foreground group-hover:text-primary transition-colors">
                      {lang === 'en' ? product.nameEn : product.nameHi}
                    </h3>
                    <div className="flex items-center gap-1 text-krishi-gold text-xs font-bold">
                      <Star size={14} fill="currentColor" />
                      {product.rating}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-foreground/40 font-medium">Price</span>
                      <span className="text-2xl font-display text-foreground">₹{product.price}</span>
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shadow-lg shadow-primary/20">
                      <ShoppingCart size={16} className="mr-2" />
                      {lang === 'en' ? "Add" : "जोड़ें"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
