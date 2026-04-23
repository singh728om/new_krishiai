
"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  ShoppingCart, 
  ArrowLeft, 
  Bike, 
  MapPin, 
  Zap, 
  Search, 
  ChevronRight,
  Store,
  Clock,
  Navigation,
  ShieldCheck,
  LocateFixed,
  Map as MapIcon,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useSettings } from "@/context/settings-context";
import { useCart } from "@/context/cart-context";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const STORES = [
  { 
    id: "str-1", 
    name: "Varanasi North Cluster", 
    district: "Varanasi", 
    pincode: "221001",
    distance: "1.2km", 
    rating: 4.9, 
    time: "30-45 min", 
    image: "https://picsum.photos/seed/farm1/600/400" 
  },
  { 
    id: "str-2", 
    name: "Ghazipur Organic Hub", 
    district: "Ghazipur", 
    pincode: "233001",
    distance: "3.4km", 
    rating: 4.7, 
    time: "45-60 min", 
    image: "https://picsum.photos/seed/farm2/600/400" 
  },
  { 
    id: "str-3", 
    name: "Mirzapur Hill Farm", 
    district: "Mirzapur", 
    pincode: "231001",
    distance: "12.8km", 
    rating: 4.8, 
    time: "90-120 min", 
    image: "https://picsum.photos/seed/farm3/600/400" 
  },
  { 
    id: "str-4", 
    name: "Sarnath Green Field", 
    district: "Varanasi", 
    pincode: "221007",
    distance: "0.8km", 
    rating: 5.0, 
    time: "25-35 min", 
    image: "https://picsum.photos/seed/farm4/600/400" 
  },
  { 
    id: "str-5", 
    name: "Prayagraj River Cluster", 
    district: "Prayagraj", 
    pincode: "211001",
    distance: "2.5km", 
    rating: 4.6, 
    time: "40-50 min", 
    image: "https://picsum.photos/seed/farm5/600/400" 
  },
  { 
    id: "str-6", 
    name: "Sonbhadra Valley Farm", 
    district: "Sonbhadra", 
    pincode: "231216",
    distance: "5.1km", 
    rating: 4.8, 
    time: "60-80 min", 
    image: "https://picsum.photos/seed/farm6/600/400" 
  },
];

const CATEGORIES = [
  { id: "all", nameEn: "All", nameHi: "सब", icon: "🌱" },
  { id: "veggies", nameEn: "Veggies", nameHi: "सब्जियां", icon: "🥦" },
  { id: "dairy", nameEn: "Milk & Ghee", nameHi: "दूध और घी", icon: "🥛" },
  { id: "fruits", nameEn: "Fruits", nameHi: "फल", icon: "🍎" },
  { id: "pantry", nameEn: "Honey", nameHi: "शहद", icon: "🍯" },
];

const ALL_PRODUCTS = [
  { id: "tomato", storeId: "str-1", cat: "veggies", nameEn: "Organic Cherry Tomatoes", nameHi: "ऑर्गेनिक चेरी टमाटर", price: 180, rating: 4.9 },
  { id: "potato", storeId: "str-2", cat: "veggies", nameEn: "Farm Fresh Potatoes", nameHi: "ताजा आलू", price: 45, rating: 4.7 },
  { id: "mango", storeId: "str-1", cat: "fruits", nameEn: "Banarasi Langra Mangoes", nameHi: "बनारसी लंगड़ा आम", price: 600, rating: 5.0 },
  { id: "milk", storeId: "str-4", cat: "dairy", nameEn: "A2 Desi Cow Milk (1L)", nameHi: "ए2 देसी गाय का दूध", price: 90, rating: 4.9 },
  { id: "ghee", storeId: "str-4", cat: "dairy", nameEn: "A2 Desi Cow Ghee", nameHi: "ए2 देसी गाय का घी", price: 850, rating: 4.9 },
  { id: "honey", storeId: "str-3", cat: "pantry", nameEn: "Wild Forest Honey", nameHi: "जंगल का शहद", price: 450, rating: 4.8 },
  { id: "wheat", storeId: "str-2", cat: "veggies", nameEn: "Sun-dried Wheat", nameHi: "धूप में सुखाया गया गेहूं", price: 120, rating: 4.7 },
];

export default function HaritMarketplace() {
  const { lang } = useSettings();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  // Advanced Location State
  const [location, setLocation] = useState({
    village: "Lanka",
    pincode: "221005",
    district: "Varanasi",
    state: "Uttar Pradesh"
  });
  
  const [isLocating, setIsLocating] = useState(false);
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [tempLocation, setTempLocation] = useState(location);

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchInput] = useState("");
  const [selectedStore, setSelectedStore] = useState<typeof STORES[0] | null>(null);

  // Filter stores based on user location (Within 15km logic simulation)
  const filteredStores = useMemo(() => {
    // We simulate 15km by matching district or pincode proximity
    return STORES.filter(s => 
      s.district.toLowerCase() === location.district.toLowerCase() || 
      s.pincode.slice(0, 3) === location.pincode.slice(0, 3)
    );
  }, [location]);

  const filteredProducts = useMemo(() => {
    let list = ALL_PRODUCTS;
    if (selectedStore) list = list.filter(p => p.storeId === selectedStore.id);
    if (activeCategory !== "all") list = list.filter(p => p.cat === activeCategory);
    if (searchQuery) list = list.filter(p => p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()));
    return list;
  }, [selectedStore, activeCategory, searchQuery]);

  const handleSetLocation = () => {
    setIsLocating(true);
    // Simulate technical scanning
    setTimeout(() => {
      setLocation(tempLocation);
      setIsLocating(false);
      setIsLocationDialogOpen(false);
      setSelectedStore(null);
      toast({
        title: lang === 'en' ? "Location Updated" : "स्थान अपडेट किया गया",
        description: `${tempLocation.village}, ${tempLocation.district} is now active.`
      });
    }, 1500);
  };

  const handleAdd = (product: any) => {
    const imageData = PlaceHolderImages.find(img => img.id === product.id) || PlaceHolderImages[0];
    addToCart({
      id: product.id,
      name: lang === 'en' ? product.nameEn : product.nameHi,
      price: product.price,
      quantity: 1,
      imageUrl: imageData.imageUrl
    });
    toast({
      title: lang === 'en' ? "Added to Cart" : "कार्ट में जोड़ा गया",
      description: `${lang === 'en' ? product.nameEn : product.nameHi} added.`,
    });
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <section className="flex-1 pt-32 pb-24 container mx-auto px-6 max-w-6xl">
        
        {/* Header: Advanced Location Selector & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="space-y-1">
             <button 
               onClick={() => setIsLocationDialogOpen(true)}
               className="flex items-center gap-2 text-primary font-bold text-sm hover:opacity-80 transition-opacity group bg-primary/5 px-4 py-2 rounded-full border border-primary/10"
             >
                <MapPin size={18} className="group-hover:animate-bounce" />
                <span className="max-w-[200px] truncate">{location.village}, {location.district}</span>
                <ChevronRight size={14} className="text-foreground/40" />
             </button>
             <p className="text-[10px] text-foreground/40 uppercase tracking-widest font-bold ml-4">
               15km Hyper-local Network Active
             </p>
          </div>

          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={18} />
            <Input 
              placeholder={lang === 'en' ? "Search for fresh veggies, milk, or ghee..." : "ताजी सब्जियां, दूध या घी खोजें..."}
              className="pl-12 h-14 rounded-2xl bg-card border-border shadow-sm focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-4 overflow-x-auto pb-8 mb-8 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-headline font-bold text-sm whitespace-nowrap transition-all border ${
                activeCategory === cat.id 
                ? "bg-primary text-white border-primary shadow-lg scale-105" 
                : "bg-card text-foreground/60 border-border hover:border-primary/20"
              }`}
            >
              <span className="text-xl">{cat.icon}</span>
              {lang === 'en' ? cat.nameEn : cat.nameHi}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!selectedStore ? (
            <motion.div 
              key="store-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-10"
            >
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-display italic">Farms in <span className="text-primary">{location.district}</span></h2>
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">{filteredStores.length} ACTIVE</Badge>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {filteredStores.length > 0 ? filteredStores.map((store) => (
                  <motion.div
                    key={store.id}
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedStore(store)}
                    className="group bg-card rounded-[2.5rem] border border-border overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all"
                  >
                    <div className="h-56 relative overflow-hidden bg-muted">
                      <img src={store.image} alt={store.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-primary border border-border">
                         {store.distance} AWAY
                      </div>
                      <div className="absolute bottom-4 right-4 bg-krishi-lime text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                        <ShieldCheck size={12} /> HYPER-LOCAL
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-headline font-bold group-hover:text-primary transition-colors">{store.name}</h3>
                          <p className="text-[10px] font-code text-foreground/40 uppercase mt-1">PINCODE: {store.pincode}</p>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/20 gap-1">
                          <Star size={12} fill="currentColor" /> {store.rating}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-foreground/40 text-sm font-medium">
                        <div className="flex items-center gap-2"><Clock size={16} className="text-krishi-amber" /> {store.time}</div>
                        <div className="flex items-center gap-2"><Bike size={16} className="text-blue-500" /> ₹30 Delivery</div>
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <div className="col-span-2 py-24 text-center space-y-6 bg-muted/10 rounded-[3rem] border border-dashed border-border">
                    <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto text-foreground/20">
                      <Navigation size={40} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-display">No Clusters in {location.district} yet.</h3>
                      <p className="text-foreground/40 max-w-sm mx-auto">We are expanding our IoT sensor network daily. Try searching for "Varanasi" or "Prayagraj".</p>
                    </div>
                    <Button onClick={() => setIsLocationDialogOpen(true)} variant="outline" className="rounded-full px-8">Change Location</Button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="product-list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-12"
            >
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => setSelectedStore(null)} className="rounded-full h-12 w-12 border border-border bg-card">
                  <ArrowLeft size={20} />
                </Button>
                <div>
                  <h2 className="text-3xl font-display">{selectedStore.name}</h2>
                  <p className="text-foreground/40 text-sm font-bold uppercase tracking-widest">{selectedStore.district} Cluster • {selectedStore.time} Delivery</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => {
                  const imageData = PlaceHolderImages.find(img => img.id === product.id) || PlaceHolderImages[0];
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      key={product.id}
                      className="bg-card rounded-[2rem] border border-border overflow-hidden group shadow-sm hover:shadow-xl transition-all"
                    >
                      <div className="h-48 relative overflow-hidden bg-muted">
                        <img src={imageData.imageUrl} alt={product.nameEn} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <div className="p-6 space-y-4">
                        <h3 className="font-headline font-bold text-lg leading-tight">{lang === 'en' ? product.nameEn : product.nameHi}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-display">₹{product.price}</span>
                          <Button 
                            size="sm" 
                            onClick={() => handleAdd(product)}
                            className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Location Selector Dialog */}
        <Dialog open={isLocationDialogOpen} onOpenChange={setIsLocationDialogOpen}>
          <DialogContent className="rounded-[3rem] p-0 overflow-hidden border-border bg-card max-w-lg">
            <div className="h-32 bg-primary relative flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]" />
               <MapIcon className="text-white/20 w-48 h-48 absolute rotate-12 -right-8 -top-8" />
               <DialogTitle className="text-2xl font-display italic text-white relative z-10">Select Delivery Cluster</DialogTitle>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Village / Locality</Label>
                  <Input 
                    value={tempLocation.village} 
                    onChange={e => setTempLocation({...tempLocation, village: e.target.value})}
                    placeholder="E.g. Lanka" 
                    className="rounded-xl h-12" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Pincode</Label>
                  <Input 
                    value={tempLocation.pincode} 
                    onChange={e => setTempLocation({...tempLocation, pincode: e.target.value})}
                    placeholder="6-digit PIN" 
                    maxLength={6}
                    className="rounded-xl h-12" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">District</Label>
                  <Input 
                    value={tempLocation.district} 
                    onChange={e => setTempLocation({...tempLocation, district: e.target.value})}
                    placeholder="E.g. Varanasi" 
                    className="rounded-xl h-12" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">State</Label>
                  <Input 
                    value={tempLocation.state} 
                    onChange={e => setTempLocation({...tempLocation, state: e.target.value})}
                    placeholder="Uttar Pradesh" 
                    className="rounded-xl h-12" 
                  />
                </div>
              </div>

              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-4">
                 <ShieldCheck className="text-primary shrink-0 mt-1" size={20} />
                 <p className="text-[11px] text-foreground/60 leading-relaxed">
                   KrishiAI operates through local farming clusters. We fulfill orders within a 15km radius of each hub to ensure maximum freshness.
                 </p>
              </div>

              <Button 
                onClick={handleSetLocation} 
                disabled={isLocating}
                className="w-full rounded-full py-8 text-lg font-bold bg-primary text-white shadow-lg shadow-primary/20"
              >
                {isLocating ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Scanning Clusters...</>
                ) : (
                  <><CheckCircle2 className="mr-2 h-5 w-5" /> Confirm Location</>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </section>

      <Footer />
    </main>
  );
}

