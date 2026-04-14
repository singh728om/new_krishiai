
"use client";

import { motion } from "framer-motion";
import { 
  Sprout, 
  TrendingUp, 
  Droplets, 
  CloudSun, 
  Zap, 
  MapPin, 
  LayoutDashboard, 
  History, 
  Leaf,
  Settings,
  Bell
} from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { useSettings } from "@/context/settings-context";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const FARM_STATS = [
  { label: "Active Area", value: "24.5 Acres", icon: MapPin, color: "text-blue-500" },
  { label: "Soil Health", value: "Optimal", icon: Sprout, color: "text-krishi-lime" },
  { label: "Water Level", value: "72%", icon: Droplets, color: "text-blue-400" },
  { label: "Yield Est.", value: "+42%", icon: TrendingUp, color: "text-krishi-amber" },
];

const CROP_CARDS = [
  { name: "Tomato (Wardha)", health: 94, status: "Healthy", area: "8.2 Ac", diseaseRisk: "Low" },
  { name: "Wheat (Mirzapur)", health: 82, status: "Attention", area: "12.0 Ac", diseaseRisk: "Moderate" },
  { name: "Mango (Varanasi)", health: 98, status: "Peak", area: "4.3 Ac", diseaseRisk: "None" },
];

export default function DashboardPage() {
  const { lang } = useSettings();

  const t = {
    title: lang === 'en' ? "Farm Commander" : "फार्म कमांडर",
    subtitle: lang === 'en' ? "Real-time AI monitoring for your Uttar Pradesh clusters." : "आपके उत्तर प्रदेश क्लस्टर के लिए रीयल-टाइम एआई निगरानी।",
    overview: lang === 'en' ? "Farm Overview" : "फार्म अवलोकन",
    cropHealth: lang === 'en' ? "Crop Health Monitor" : "फसल स्वास्थ्य मॉनिटर",
    marketAlpha: lang === 'en' ? "Market Intelligence" : "बाजार खुफिया",
    recentActivity: lang === 'en' ? "Recent Activity" : "हाल की गतिविधि",
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-24 container mx-auto px-6">
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1">
              <Zap size={14} className="mr-2" />
              AI_SYNC_ACTIVE
            </Badge>
            <span className="text-xs font-code text-foreground/40 uppercase tracking-widest">Last Updated: Just Now</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-display mb-2">{t.title}</h1>
          <p className="text-xl text-foreground/60 font-body">{t.subtitle}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {FARM_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="rounded-3xl border-border/40 shadow-sm overflow-hidden group hover:border-primary/40 transition-all">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl bg-muted/50 ${stat.color} group-hover:scale-110 transition-transform`}>
                      <stat.icon size={24} />
                    </div>
                    <Badge variant="secondary" className="text-[10px] font-bold">LIVE</Badge>
                  </div>
                  <p className="text-xs font-headline font-bold uppercase tracking-widest text-foreground/40 mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Crop Health Section */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
              <Sprout className="text-primary" />
              {t.cropHealth}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {CROP_CARDS.map((crop, i) => (
                <Card key={crop.name} className="rounded-3xl border-border shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-headline font-bold">{crop.name}</CardTitle>
                      <Badge className={
                        crop.status === 'Healthy' ? 'bg-krishi-lime' : 
                        crop.status === 'Attention' ? 'bg-krishi-amber' : 'bg-primary'
                      }>
                        {crop.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-foreground/60">
                        <span>HEALTH INDEX</span>
                        <span>{crop.health}%</span>
                      </div>
                      <Progress value={crop.health} className="h-1.5" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/30 p-3 rounded-xl">
                        <p className="text-[10px] text-foreground/40 uppercase font-bold">Area Coverage</p>
                        <p className="text-sm font-bold">{crop.area}</p>
                      </div>
                      <div className="bg-muted/30 p-3 rounded-xl">
                        <p className="text-[10px] text-foreground/40 uppercase font-bold">Disease Risk</p>
                        <p className={`text-sm font-bold ${crop.diseaseRisk === 'Low' ? 'text-krishi-lime' : 'text-krishi-amber'}`}>
                          {crop.diseaseRisk}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="rounded-3xl border-dashed border-2 border-border/60 bg-transparent flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:border-primary/40 transition-all">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Leaf size={24} />
                </div>
                <p className="font-headline font-bold text-foreground/60">Add New Cluster</p>
                <p className="text-xs text-foreground/40 mt-1">Deploy AI sensors to new fields</p>
              </Card>
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="space-y-8">
            <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
              <TrendingUp className="text-krishi-amber" />
              {t.marketAlpha}
            </h2>
            <Card className="rounded-3xl border-border shadow-xl bg-krishi-black text-white p-8 space-y-6 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <TrendingUp size={120} />
              </div>
              <div className="space-y-2 relative z-10">
                <p className="text-krishi-gold text-[10px] font-bold uppercase tracking-widest">Alpha Prediction</p>
                <h3 className="text-3xl font-display">Wheat Surge Expected.</h3>
                <p className="text-sm text-white/40 font-body">Global supply chains indicate a price peak in Wardha Cluster within 18 days.</p>
              </div>
              <div className="pt-6 border-t border-white/10 space-y-4 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-headline">Current Market</span>
                  <span className="font-bold">₹2,450 / Quintal</span>
                </div>
                <div className="flex justify-between items-center text-krishi-gold">
                  <span className="text-sm font-headline">Target (18d)</span>
                  <span className="font-bold">₹2,820 / Quintal</span>
                </div>
                <Badge className="w-full bg-krishi-gold hover:bg-krishi-gold text-black font-bold py-2 flex justify-center">
                  RECOMMENDATION: HOLD HARVEST
                </Badge>
              </div>
            </Card>

            <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
              <Bell className="text-primary" />
              {t.recentActivity}
            </h2>
            <div className="space-y-4">
              {[
                { time: "2h ago", text: "Irrigation scheduled for Wardha Tomato cluster complete.", type: "success" },
                { time: "5h ago", text: "New disease scan alert: Mirzapur Wheat shows minor rust signs.", type: "warning" },
                { time: "1d ago", text: "Carbon credit milestone: Soil Organic Carbon reached 1.2% in Varanasi.", type: "success" },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-card border border-border shadow-sm">
                  <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${activity.type === 'success' ? 'bg-krishi-lime' : 'bg-krishi-amber'}`} />
                  <div>
                    <p className="text-xs font-bold text-foreground/40 mb-1">{activity.time}</p>
                    <p className="text-sm text-foreground/80 leading-relaxed">{activity.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
