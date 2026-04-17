"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sprout, 
  TrendingUp, 
  Droplets, 
  Zap, 
  MapPin, 
  LayoutDashboard, 
  History, 
  Leaf,
  Activity,
  Cpu,
  ShieldCheck,
  Beaker,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  CreditCard,
  ChevronRight,
  Save,
  Check,
  X,
  Lock,
  Wifi,
  Signal,
  Sun,
  CloudRain,
  CloudSun,
  Wind,
  Cloud
} from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { useSettings } from "@/context/settings-context";
import { useUser, useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider,
  SidebarInset,
  SidebarHeader
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { collection, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

interface GridItem {
  id: number;
  fieldId: string;
  isLeased: boolean;
  leaseData?: any;
  produced: number;
  rate: number;
  crop: string;
  nutrients: { n: number; p: number; k: number };
  moisture: number;
  statusColor: "healthy" | "warning" | "critical" | "inactive";
  status: string;
  irrigationPass: boolean;
  soilTestPass: boolean;
  cropHealthPass: boolean;
  recommendedCrop: string;
  sensorSignal: "excellent" | "good" | "weak";
}

interface WeatherData {
  temp: number;
  humidity: number;
  wind: number;
  condition: string;
  location: string;
}

export default function DashboardPage() {
  const { lang } = useSettings();
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedSector, setSelectedSector] = useState<GridItem | null>(null);
  const [selectedLease, setSelectedLease] = useState<any | null>(null);

  const [editCrop, setEditCrop] = useState("");
  const [editProduced, setEditProduced] = useState(0);
  const [editRate, setEditRate] = useState(0);
  const [editIrrigation, setEditIrrigation] = useState(true);
  const [editSoil, setEditSoil] = useState(true);
  const [editHealth, setEditHealth] = useState(true);

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [gridData, setGridData] = useState<GridItem[]>([]);

  const WEATHER_API_KEY = "bbd6d9e679a4ff28be7bb2e21988b866";

  const registrationsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "landLeaseRegistrations"), orderBy("createdAt", "desc"));
  }, [firestore]);

  const { data: registrations } = useCollection(registrationsQuery);

  const pendingRegistrations = useMemo(() => 
    registrations?.filter(r => r.status === 'pending') || [], 
    [registrations]
  );
  
  const activeLeases = useMemo(() => {
    return registrations?.filter(r => r.status === 'reviewed') || [];
  }, [registrations]);

  useEffect(() => {
    const data = Array.from({ length: 50 }, (_, i) => {
      const lease = activeLeases[i];
      const isLeased = !!lease;
      
      const moisture = isLeased ? (Math.floor(Math.random() * 40) + 20) : 0;
      const nutrients = isLeased ? {
        n: Math.floor(Math.random() * 60) + 10,
        p: Math.floor(Math.random() * 40) + 10,
        k: Math.floor(Math.random() * 50) + 10,
      } : { n: 0, p: 0, k: 0 };

      let recommendedCrop = "Soil Analysis Pending";
      if (isLeased) {
        if (moisture > 38 && nutrients.n > 45) recommendedCrop = "Basmati Rice";
        else if (nutrients.n > 50) recommendedCrop = "Hybrid Wheat";
        else if (moisture < 28) recommendedCrop = "Mustard / Millet";
        else if (nutrients.p > 35) recommendedCrop = "Organic Potato";
        else recommendedCrop = "Sugarcane";
      }

      const irrigationPass = moisture > 30;
      const soilTestPass = (nutrients.n + nutrients.p + nutrients.k) > 100;
      const cropHealthPass = irrigationPass && soilTestPass;

      let statusColor: GridItem['statusColor'] = "inactive";
      if (isLeased) {
        if (!irrigationPass || !soilTestPass) statusColor = "critical";
        else if (moisture < 35) statusColor = "warning";
        else statusColor = "healthy";
      }

      return {
        id: i,
        fieldId: `FLD-${2000 + i}`,
        isLeased,
        leaseData: lease,
        produced: isLeased ? Math.floor(Math.random() * 10) + 2 : 0,
        rate: isLeased ? 24000 : 0,
        crop: isLeased ? "Basmati Rice" : "N/A",
        nutrients,
        moisture,
        statusColor,
        status: !isLeased ? "Unleased Asset" : statusColor === "healthy" ? "Optimal" : statusColor === "warning" ? "Needs Attention" : "Action Required",
        irrigationPass,
        soilTestPass,
        cropHealthPass,
        recommendedCrop,
        sensorSignal: Math.random() > 0.8 ? "weak" : Math.random() > 0.4 ? "good" : "excellent"
      } as GridItem;
    });

    setGridData(data);
  }, [activeLeases]);

  const fetchWeather = async (city: string) => {
    setIsWeatherLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},UP,IN&appid=${WEATHER_API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.main) {
        setWeather({
          temp: data.main.temp,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          condition: data.weather[0].main,
          location: data.name
        });
      }
    } catch (error) {
      console.error("Weather fetch error:", error);
    } finally {
      setIsWeatherLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSector) {
      setEditCrop(selectedSector.crop);
      setEditProduced(selectedSector.produced);
      setEditRate(selectedSector.rate);
      setEditIrrigation(selectedSector.irrigationPass);
      setEditSoil(selectedSector.soilTestPass);
      setEditHealth(selectedSector.cropHealthPass);
      
      const city = selectedSector.leaseData?.district || "Varanasi";
      fetchWeather(city);
    } else {
      fetchWeather("Varanasi");
    }
  }, [selectedSector]);

  const handleApprove = (regId: string) => {
    if (!firestore) return;
    const docRef = doc(firestore, "landLeaseRegistrations", regId);
    updateDoc(docRef, { status: "reviewed" })
      .then(() => {
        toast({ title: "Lease Approved", description: "Land is now active in the field monitor." });
      });
  };

  const handleReject = (regId: string) => {
    if (!firestore) return;
    const docRef = doc(firestore, "landLeaseRegistrations", regId);
    updateDoc(docRef, { status: "rejected" });
  };

  const handleSaveFieldReport = () => {
    toast({
      title: "Intelligence Synced",
      description: `Sector ${selectedSector?.fieldId} updated with crop ${editCrop}. Revenue: ₹${(editProduced * editRate).toLocaleString()}`,
    });
    setSelectedSector(null);
  };

  const t = {
    title: lang === 'en' ? "Dashboard" : "डैशबोर्ड",
    subtitle: lang === 'en' ? "Staff Intelligence Dashboard - Uttar Pradesh Clusters" : "स्टाफ इंटेलिजेंस डैशबोर्ड - उत्तर प्रदेश क्लस्टर",
    heatmapTitle: lang === 'en' ? "Field Monitor" : "फील्ड मॉनिटर",
    details: {
      owner: lang === 'en' ? "Land Owner" : "ज़मीन मालिक",
      crop: lang === 'en' ? "Cultivated Crop" : "वर्तमान फसल",
      produced: lang === 'en' ? "Yield (Tons)" : "उपयोग (टन)",
      rate: lang === 'en' ? "Market Rate (₹/Ton)" : "बाजार दर (₹/टन)",
      nutrients: lang === 'en' ? "Soil Nutrients (N-P-K)" : "मिट्टी के पोषक तत्व",
      payout: lang === 'en' ? "Monthly Payout" : "मासिक भुगतान",
    }
  };

  const navItems = [
    { id: "overview", label: lang === 'en' ? "Overview" : "अवलोकन", icon: LayoutDashboard },
    { id: "heatmap", label: lang === 'en' ? "Field Monitor" : "फील्ड मॉनिटर", icon: MapPin },
    { id: "iot", label: lang === 'en' ? "Sensor Network" : "सेंसर नेटवर्क", icon: Cpu },
    { id: "approvals", label: lang === 'en' ? "Lease Queue" : "लीज कतार", icon: History },
    { id: "active_leases", label: lang === 'en' ? "Active Leases" : "सक्रिय लीज", icon: FileText },
  ];

  const WeatherIcon = ({ condition }: { condition: string }) => {
    switch (condition) {
      case 'Clear': return <Sun className="text-krishi-gold" />;
      case 'Rain': return <CloudRain className="text-primary" />;
      case 'Clouds': return <CloudSun className="text-foreground/40" />;
      default: return <Cloud className="text-foreground/20" />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex flex-col w-full">
        <Navbar />
        
        <div className="flex flex-1 pt-20">
          <Sidebar className="border-r border-border bg-card mt-20" collapsible="none">
            <SidebarHeader className="p-6">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                     <Sprout size={18} />
                  </div>
                  <span className="font-headline font-bold text-sm tracking-tight">Staff Panel</span>
               </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel className="px-4 text-[10px] font-bold uppercase tracking-widest text-foreground/40">Main Menu</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navItems.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton 
                          onClick={() => setActiveTab(item.id)}
                          isActive={activeTab === item.id}
                          className={`w-full justify-start gap-3 px-4 py-6 rounded-none border-l-2 transition-all ${
                            activeTab === item.id 
                            ? "bg-primary/5 border-primary text-primary" 
                            : "border-transparent text-foreground/60 hover:bg-muted/50"
                          }`}
                        >
                          <item.icon size={18} />
                          <span className="font-medium">{item.label}</span>
                          {item.id === "approvals" && pendingRegistrations.length > 0 && (
                            <Badge className="ml-auto bg-krishi-amber text-white text-[10px] h-5 w-5 flex items-center justify-center p-0 rounded-full">
                              {pendingRegistrations.length}
                            </Badge>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <SidebarInset className="flex-1 bg-background/50 overflow-y-auto">
            <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12 pb-24">
              
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 font-code">
                      <ShieldCheck size={14} className="mr-2" />
                      FIELD_MASTER_ACTIVE
                    </Badge>
                    {weather && (
                      <Badge variant="outline" className="bg-krishi-gold/5 text-krishi-gold border-krishi-gold/20 px-3 py-1 font-code flex items-center gap-2">
                        <WeatherIcon condition={weather.condition} />
                        {weather.temp}°C in {weather.location}
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-4xl md:text-6xl font-display">
                    {navItems.find(n => n.id === activeTab)?.label}
                  </h1>
                  <p className="text-xl text-foreground/60 font-body">{t.subtitle}</p>
                </div>
              </header>

              <AnimatePresence mode="wait">
                {(activeTab === "overview" || activeTab === "heatmap") && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid lg:grid-cols-3 gap-8"
                  >
                    <Card className="lg:col-span-2 rounded-[2.5rem] border-border shadow-sm overflow-hidden bg-card">
                      <CardHeader className="border-b border-border/50 p-8">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="text-2xl font-headline font-bold">{t.heatmapTitle}</CardTitle>
                            <CardDescription>Live Field Monitoring Heatmap</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-8">
                        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                          {gridData.map((grid) => (
                            <motion.div
                              key={grid.id}
                              whileHover={grid.isLeased ? { scale: 1.1, zIndex: 10 } : {}}
                              onClick={() => grid.isLeased && setSelectedSector(grid)}
                              className={`aspect-square rounded-lg flex flex-col items-center justify-center transition-all border border-black/5 ${
                                !grid.isLeased ? "bg-muted/30 grayscale opacity-40 cursor-not-allowed" :
                                grid.statusColor === "healthy" ? "bg-krishi-lime cursor-pointer shadow-sm hover:shadow-lg" :
                                grid.statusColor === "warning" ? "bg-krishi-amber cursor-pointer shadow-sm hover:shadow-lg" :
                                "bg-red-500 cursor-pointer shadow-sm hover:shadow-lg"
                              }`}
                            >
                              <span className={`text-[8px] font-bold mb-0.5 ${grid.isLeased ? 'text-white/60' : 'text-foreground/20'}`}>#{grid.id}</span>
                              {!grid.isLeased && <Lock size={10} className="text-foreground/10" />}
                              {grid.isLeased && grid.statusColor === "critical" && <AlertTriangle size={12} className="text-white animate-pulse" />}
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-8">
                      <Card className="rounded-[2rem] bg-krishi-black text-white p-8 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <TrendingUp size={80} />
                        </div>
                        <p className="text-krishi-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Network Yield</p>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <h4 className="text-3xl font-display">{activeLeases.length * 12}T</h4>
                              <p className="text-[10px] text-white/40 uppercase">Total Est. Yield</p>
                           </div>
                           <div>
                              <h4 className="text-3xl font-display">₹{(activeLeases.length * 280000).toLocaleString()}</h4>
                              <p className="text-[10px] text-white/40 uppercase">Projected Rev</p>
                           </div>
                        </div>
                      </Card>

                      {weather && (
                        <Card className="rounded-[2rem] bg-card border-border p-8 relative overflow-hidden shadow-xl">
                          <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Live Weather Report</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-4xl font-display">{weather.temp}°C</h4>
                              <p className="text-xs text-foreground/60 uppercase font-bold tracking-widest">{weather.condition} in {weather.location}</p>
                            </div>
                            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                              <WeatherIcon condition={weather.condition} />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
                            <div className="flex items-center gap-2">
                              <Droplets size={14} className="text-primary" />
                              <span className="text-xs font-bold">{weather.humidity}% Humid</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Wind size={14} className="text-krishi-amber" />
                              <span className="text-xs font-bold">{weather.wind} km/h</span>
                            </div>
                          </div>
                        </Card>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === "iot" && (
                  <motion.div
                    key="iot"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-8"
                  >
                    <div className="grid md:grid-cols-4 gap-6">
                      <Card className="p-6 bg-card border-border rounded-3xl">
                        <div className="flex items-center gap-3 mb-2 text-primary">
                          <Droplets size={20} />
                          <h4 className="font-bold">Avg Moisture</h4>
                        </div>
                        <p className="text-3xl font-display">38.4%</p>
                        <p className="text-xs text-krishi-lime font-bold uppercase tracking-widest mt-2">Optimal Range</p>
                      </Card>
                      <Card className="p-6 bg-card border-border rounded-3xl">
                        <div className="flex items-center gap-3 mb-2 text-krishi-amber">
                          <Beaker size={20} />
                          <h4 className="font-bold">Soil Nutrients</h4>
                        </div>
                        <p className="text-3xl font-display">High (N)</p>
                        <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest mt-2">N-P-K Aggregate</p>
                      </Card>
                      <Card className="p-6 bg-card border-border rounded-3xl">
                        <div className="flex items-center gap-3 mb-2 text-blue-500">
                          <Wifi size={20} />
                          <h4 className="font-bold">Kits Online</h4>
                        </div>
                        <p className="text-3xl font-display">{gridData.filter(g => g.isLeased).length} / 50</p>
                        <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest mt-2">Active Sensors</p>
                      </Card>
                      <Card className="p-6 bg-card border-border rounded-3xl">
                        <div className="flex items-center gap-3 mb-2 text-krishi-gold">
                          <Zap size={20} />
                          <h4 className="font-bold">AI Advisory</h4>
                        </div>
                        <p className="text-xl font-headline leading-tight">Irrigate Sector #04 in 2hrs</p>
                        <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest mt-2">Prediction Engine</p>
                      </Card>
                    </div>

                    <Card className="rounded-[2.5rem] border-border shadow-sm overflow-hidden bg-card">
                      <Table>
                        <TableHeader className="bg-muted/30">
                          <TableRow>
                            <TableHead className="font-bold">Field ID</TableHead>
                            <TableHead className="font-bold">Soil Nutrients (N-P-K)</TableHead>
                            <TableHead className="font-bold">Moisture</TableHead>
                            <TableHead className="font-bold">Best AI Recommended Crop</TableHead>
                            <TableHead className="font-bold">Signal</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {gridData.filter(g => g.isLeased).map((grid) => (
                            <TableRow key={grid.fieldId} className="hover:bg-muted/10">
                              <TableCell className="font-code font-bold text-primary">{grid.fieldId}</TableCell>
                              <TableCell>
                                <div className="flex gap-4">
                                  <div className="flex flex-col">
                                    <span className="text-[10px] text-foreground/40 font-bold">N</span>
                                    <span className="font-bold text-primary">{grid.nutrients.n}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[10px] text-foreground/40 font-bold">P</span>
                                    <span className="font-bold text-krishi-amber">{grid.nutrients.p}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[10px] text-foreground/40 font-bold">K</span>
                                    <span className="font-bold text-krishi-gold">{grid.nutrients.k}</span>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Progress value={grid.moisture} className="h-2 w-16" />
                                  <span className="font-medium">{grid.moisture}%</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="border-primary/20 text-primary font-bold">
                                  {grid.recommendedCrop}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Signal size={16} className={
                                  grid.sensorSignal === 'excellent' ? 'text-krishi-lime' :
                                  grid.sensorSignal === 'good' ? 'text-primary' : 'text-krishi-amber'
                                } />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Card>
                  </motion.div>
                )}

                {activeTab === "approvals" && (
                  <motion.div
                    key="approvals"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    <Card className="rounded-[2.5rem] border-border shadow-sm overflow-hidden bg-card">
                      <Table>
                        <TableHeader className="bg-muted/30">
                          <TableRow>
                            <TableHead className="font-bold">Applicant</TableHead>
                            <TableHead className="font-bold">Location</TableHead>
                            <TableHead className="font-bold">Area</TableHead>
                            <TableHead className="font-bold">Status</TableHead>
                            <TableHead className="text-right font-bold">Verification Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pendingRegistrations.map((reg: any) => (
                            <TableRow key={reg.id} className="hover:bg-muted/10">
                              <TableCell className="font-medium">
                                <div>
                                    <p className="font-bold">{reg.aadharName}</p>
                                    <p className="text-xs text-foreground/40">Mobile: {reg.mobile}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <p className="text-sm">{reg.village}, {reg.district}</p>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary">{reg.fieldSize} {reg.fieldUnit}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge className="bg-krishi-amber text-white">PENDING_REVIEW</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-3">
                                    <Button size="sm" variant="ghost" className="text-krishi-lime hover:bg-krishi-lime/10" onClick={() => handleApprove(reg.id)}>
                                      <CheckCircle2 size={18} className="mr-2" /> Approve
                                    </Button>
                                    <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => handleReject(reg.id)}>
                                      <XCircle size={18} className="mr-2" /> Reject
                                    </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Card>
                  </motion.div>
                )}

                {activeTab === "active_leases" && (
                  <motion.div
                    key="active_leases"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {activeLeases.map((reg: any) => (
                      <Card key={reg.id} className="rounded-3xl border-border bg-card p-6 hover:shadow-xl transition-all group cursor-pointer" onClick={() => setSelectedLease(reg)}>
                         <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-primary/10 text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors">
                               <FileText size={20} />
                            </div>
                            <Badge className="bg-krishi-lime/10 text-krishi-lime border-krishi-lime/20">VERIFIED</Badge>
                         </div>
                         <h4 className="text-lg font-bold mb-1">{reg.aadharName}</h4>
                         <p className="text-xs text-foreground/40 mb-4 uppercase tracking-widest">{reg.village}, {reg.district}</p>
                         <div className="flex items-center justify-between pt-4 border-t border-border">
                            <span className="text-sm font-medium">{reg.fieldSize} {reg.fieldUnit}</span>
                            <ChevronRight className="text-foreground/20 group-hover:text-primary transition-colors" size={16} />
                         </div>
                      </Card>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SidebarInset>
        </div>

        <Dialog open={!!selectedSector} onOpenChange={() => setSelectedSector(null)}>
          <DialogContent className="rounded-[2.5rem] p-8 max-w-2xl border-primary/20 bg-card/95 backdrop-blur-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="space-y-4">
              <div className="flex justify-between items-start">
                <Badge className={`${
                  selectedSector?.statusColor === 'healthy' ? 'bg-krishi-lime' :
                  selectedSector?.statusColor === 'warning' ? 'bg-krishi-amber' : 'bg-red-500'
                } text-white uppercase tracking-widest px-3 py-1`}>
                  Field Master Diagnostic: {selectedSector?.fieldId}
                </Badge>
              </div>
              <DialogTitle className="text-3xl font-display">Sector Intelligence Report</DialogTitle>
              <DialogDescription className="font-code text-foreground/60">
                Land Owner: {selectedSector?.leaseData?.aadharName} | Cluster: {selectedSector?.leaseData?.district}
              </DialogDescription>
            </DialogHeader>

            {weather && (
              <div className="mt-6 p-6 bg-primary/5 rounded-2xl border border-primary/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-foreground/40 uppercase font-bold tracking-widest mb-1">Local Weather Guard</p>
                  <p className="text-xl font-bold">{weather.temp}°C, {weather.condition}</p>
                  <p className="text-xs text-foreground/60">{weather.humidity}% Humidity | {weather.wind} km/h Wind</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                   <WeatherIcon condition={weather.condition} />
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Field Diagnostics</h4>
                
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-border">
                  <div className="flex items-center gap-3 text-sm font-medium">
                    <Droplets size={18} className="text-primary" /> Irrigation Log
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditIrrigation(true)}
                      className={`p-1.5 rounded-lg transition-all ${editIrrigation ? 'bg-krishi-lime text-white' : 'bg-muted text-foreground/20'}`}
                    >
                      <Check size={16} />
                    </button>
                    <button 
                      onClick={() => setEditIrrigation(false)}
                      className={`p-1.5 rounded-lg transition-all ${!editIrrigation ? 'bg-red-500 text-white' : 'bg-muted text-foreground/20'}`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-border">
                  <div className="flex items-center gap-3 text-sm font-medium">
                    <Activity size={18} className="text-primary" /> Soil Nutrient Test
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditSoil(true)}
                      className={`p-1.5 rounded-lg transition-all ${editSoil ? 'bg-krishi-lime text-white' : 'bg-muted text-foreground/20'}`}
                    >
                      <Check size={16} />
                    </button>
                    <button 
                      onClick={() => setEditSoil(false)}
                      className={`p-1.5 rounded-lg transition-all ${!editSoil ? 'bg-red-500 text-white' : 'bg-muted text-foreground/20'}`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-border">
                  <div className="flex items-center gap-3 text-sm font-medium">
                    <Leaf size={18} className="text-primary" /> Crop Health Pass
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditHealth(true)}
                      className={`p-1.5 rounded-lg transition-all ${editHealth ? 'bg-krishi-lime text-white' : 'bg-muted text-foreground/20'}`}
                    >
                      <Check size={16} />
                    </button>
                    <button 
                      onClick={() => setEditHealth(false)}
                      className={`p-1.5 rounded-lg transition-all ${!editHealth ? 'bg-red-500 text-white' : 'bg-muted text-foreground/20'}`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                <div className="p-6 bg-krishi-black text-white rounded-2xl border border-border">
                   <p className="text-[10px] text-white/40 uppercase mb-2 tracking-widest">AI Best Crop Recommendation</p>
                   <p className="text-xl font-headline text-krishi-gold mb-4">{selectedSector?.recommendedCrop}</p>
                   <p className="text-[10px] text-white/40 uppercase mb-2 tracking-widest">Calculated Revenue</p>
                   <div className="flex items-end gap-2">
                      <span className="text-3xl font-display text-krishi-gold">₹{(editProduced * editRate).toLocaleString()}</span>
                   </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Crop Management</h4>
                
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase text-foreground/40">{t.details.crop}</Label>
                  <Input 
                    value={editCrop} 
                    onChange={(e) => setEditCrop(e.target.value)}
                    className="rounded-xl h-12 bg-muted/30 border-border"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase text-foreground/40">{t.details.produced}</Label>
                    <Input 
                      type="number" 
                      value={editProduced} 
                      onChange={(e) => setEditProduced(Number(e.target.value))}
                      className="rounded-xl h-12 bg-muted/30 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase text-foreground/40">{t.details.rate}</Label>
                    <Input 
                      type="number" 
                      value={editRate} 
                      onChange={(e) => setEditRate(Number(e.target.value))}
                      className="rounded-xl h-12 bg-muted/30 border-border"
                    />
                  </div>
                </div>

                <div className="p-6 bg-muted/30 rounded-2xl border border-border">
                  <p className="text-[10px] text-foreground/40 uppercase mb-3">Live N-P-K Sensors</p>
                  <div className="flex gap-4">
                     <div className="flex-1 text-center">
                        <div className="text-xl font-bold text-primary">{selectedSector?.nutrients.n}</div>
                        <div className="text-[8px] uppercase">Nitrogen</div>
                     </div>
                     <div className="flex-1 text-center">
                        <div className="text-xl font-bold text-krishi-amber">{selectedSector?.nutrients.p}</div>
                        <div className="text-[8px] uppercase">Phosphorus</div>
                     </div>
                     <div className="flex-1 text-center">
                        <div className="text-xl font-bold text-krishi-gold">{selectedSector?.nutrients.k}</div>
                        <div className="text-[8px] uppercase">Potassium</div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button onClick={handleSaveFieldReport} className="w-full rounded-full py-8 mt-8 font-bold bg-primary text-white text-lg">
              <Save className="mr-2 h-5 w-5" /> Sync Diagnostic Intelligence
            </Button>
          </DialogContent>
        </Dialog>

        <Dialog open={!!selectedLease} onOpenChange={() => setSelectedLease(null)}>
           <DialogContent className="rounded-[3rem] p-0 max-w-2xl border-border bg-card overflow-hidden">
              <div className="h-32 bg-primary relative overflow-hidden">
                 <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]" />
                 <div className="absolute bottom-6 left-8 text-white">
                    <h2 className="text-2xl font-display italic">Digital Agreement #KR-{selectedLease?.id?.slice(0, 6).toUpperCase()}</h2>
                 </div>
              </div>

              <div className="p-8 space-y-8">
                 <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-1">
                       <p className="text-[10px] font-bold text-foreground/40 uppercase">Land Owner</p>
                       <p className="font-bold">{selectedLease?.aadharName}</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-bold text-foreground/40 uppercase">Cluster Zone</p>
                       <p className="font-bold">{selectedLease?.district}, UP</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-bold text-foreground/40 uppercase">Area Size</p>
                       <p className="font-bold">{selectedLease?.fieldSize} {selectedLease?.fieldUnit}</p>
                    </div>
                 </div>

                 <div className="bg-primary/5 rounded-[2rem] p-8 border border-primary/10">
                    <div className="flex items-center justify-between mb-6">
                       <div className="flex items-center gap-3">
                          <div className="p-3 bg-primary text-white rounded-xl">
                             <CreditCard size={20} />
                          </div>
                          <div>
                             <h4 className="font-bold">{t.details.payout}</h4>
                             <p className="text-[10px] text-foreground/40 uppercase">Monthly Verified</p>
                          </div>
                       </div>
                       <p className="text-3xl font-display font-bold text-primary">₹{(selectedLease?.fieldSize * 3500).toLocaleString()}</p>
                    </div>
                    <div className="space-y-2 text-xs text-foreground/40 uppercase font-bold tracking-widest">
                       Agreement Status: <span className="text-krishi-lime ml-2">VERIFIED_AND_ACTIVE</span>
                    </div>
                 </div>

                 <Button onClick={() => setSelectedLease(null)} className="w-full rounded-full py-8 text-lg font-bold">
                    Close Document
                 </Button>
              </div>
           </DialogContent>
        </Dialog>

        <Footer />
      </div>
    </SidebarProvider>
  );
}
