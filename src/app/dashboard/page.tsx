
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Activity,
  Cpu,
  Database,
  ShieldCheck,
  Users,
  IndianRupee,
  Beaker,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { useSettings } from "@/context/settings-context";
import { useUser, useCollection, useFirestore } from "@/firebase";
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
import { collection, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { useMemoFirebase } from "@/firebase/firestore/use-collection";

// Enhanced Mock data for the 50-grid heatmap
const crops = ["Banarasi Mango", "Organic Tomato", "Basmati Rice", "Wheat", "Mustard", "Corn"];
const owners = ["Ram Singh", "Vijay Kumar", "Anita Devi", "Suresh Prasad", "Rajesh Khanna", "Sunita Verma"];

interface GridItem {
  id: number;
  fieldId: string;
  produced: string;
  nutrients: { n: number; p: number; k: number };
  moisture: number;
  statusColor: "healthy" | "warning" | "critical";
  ownerName: string;
  crop: string;
  revenue: number;
  status: string;
  pincode: string;
}

const generateGridData = (): GridItem[] => {
  return Array.from({ length: 50 }, (_, i) => {
    // Generate randomized but realistic values
    const moisture = Math.floor(Math.random() * 60) + 5; // 5% to 65%
    const nutrients = {
      n: Math.floor(Math.random() * 60) + 5,
      p: Math.floor(Math.random() * 40) + 5,
      k: Math.floor(Math.random() * 50) + 5,
    };

    // Logical Status Determination
    let statusColor: "healthy" | "warning" | "critical" = "healthy";
    const avgN = (nutrients.n + nutrients.p + nutrients.k) / 3;

    if (moisture < 15 || avgN < 18) {
      statusColor = "critical";
    } else if (moisture < 30 || avgN < 30) {
      statusColor = "warning";
    }

    return {
      id: i,
      fieldId: `FLD-${2000 + i}`,
      produced: (Math.random() * 5 + 1).toFixed(1) + " Tons",
      nutrients,
      moisture,
      statusColor,
      ownerName: owners[Math.floor(Math.random() * owners.length)],
      crop: crops[Math.floor(Math.random() * crops.length)],
      revenue: Math.floor(Math.random() * 45000) + 15000,
      status: statusColor === "healthy" ? "Optimal Health" : statusColor === "warning" ? "Needs Attention" : "Action Required",
      pincode: "22100" + (i % 10),
    };
  });
};

export default function DashboardPage() {
  const { lang } = useSettings();
  const { user } = useUser();
  const firestore = useFirestore();
  const [gridData] = useState<GridItem[]>(generateGridData());
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedSector, setSelectedSector] = useState<GridItem | null>(null);

  // Fetch pending registrations for Staff Approval logic
  const registrationsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "landLeaseRegistrations"), orderBy("createdAt", "desc"));
  }, [firestore]);

  const { data: registrations } = useCollection(registrationsQuery);

  const handleApprove = (regId: string) => {
    if (!firestore) return;
    const docRef = doc(firestore, "landLeaseRegistrations", regId);
    updateDoc(docRef, { status: "reviewed" });
  };

  const t = {
    title: lang === 'en' ? "Dashboard" : "डैशबोर्ड",
    subtitle: lang === 'en' ? "Staff Intelligence Dashboard - Uttar Pradesh Clusters" : "स्टाफ इंटेलिजेंस डैशबोर्ड - उत्तर प्रदेश क्लस्टर",
    heatmapTitle: lang === 'en' ? "Field Monitor Heatmap" : "फील्ड मॉनिटर हीटमैप",
    iotTitle: lang === 'en' ? "IOT Sensor Network" : "आईओटी सेंसर नेटवर्क",
    approvalTitle: lang === 'en' ? "Lease Approval Queue" : "लीज अनुमोदन कतार",
    details: {
      owner: lang === 'en' ? "Land Owner" : "ज़मीन मालिक",
      crop: lang === 'en' ? "Current Crop" : "वर्तमान फसल",
      revenue: lang === 'en' ? "Est. Revenue" : "अनुमानित राजस्व",
      produced: lang === 'en' ? "Yield Produced" : "उत्पादित पैदावार",
      nutrients: lang === 'en' ? "Soil Nutrients (N-P-K)" : "मिट्टी के पोषक तत्व",
      status: lang === 'en' ? "Status" : "स्थिति",
    }
  };

  const navItems = [
    { id: "overview", label: lang === 'en' ? "Overview" : "अवलोकन", icon: LayoutDashboard },
    { id: "heatmap", label: lang === 'en' ? "Field Monitor" : "फील्ड मॉनिटर", icon: MapPin },
    { id: "iot", label: lang === 'en' ? "Sensor Network" : "सेंसर नेटवर्क", icon: Cpu },
    { id: "approvals", label: lang === 'en' ? "Lease Queue" : "लीज कतार", icon: History },
    { id: "farmers", label: lang === 'en' ? "Farmers" : "किसान", icon: Users },
    { id: "settings", label: lang === 'en' ? "Settings" : "सेटिंग्स", icon: Settings },
  ];

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
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <SidebarInset className="flex-1 bg-background/50 overflow-y-auto">
            <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
              
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                  >
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 font-code">
                      <ShieldCheck size={14} className="mr-2" />
                      STAFF_PRIVILEGE_ACTIVE
                    </Badge>
                    <span className="text-[10px] font-code text-foreground/40 uppercase tracking-widest">Region: EASTERN_UP_ZONE</span>
                  </motion.div>
                  <h1 className="text-4xl md:text-6xl font-display">{t.title}</h1>
                  <p className="text-xl text-foreground/60 font-body">{t.subtitle}</p>
                </div>
                
                <div className="flex gap-4">
                  <Card className="bg-card border-border px-6 py-4 rounded-2xl flex items-center gap-4">
                      <div className="p-3 bg-krishi-gold/10 text-krishi-gold rounded-xl">
                        <Leaf size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-foreground/40 uppercase">Carbon Credits</p>
                        <p className="text-xl font-bold">1,242.8 CO2e</p>
                      </div>
                  </Card>
                </div>
              </header>

              <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 rounded-[2.5rem] border-border shadow-sm overflow-hidden bg-card">
                  <CardHeader className="border-b border-border/50 p-8">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-2xl font-headline font-bold">{t.heatmapTitle}</CardTitle>
                        <CardDescription>Visual Diagnostic • Grid-based Sensor Intelligence</CardDescription>
                      </div>
                      <div className="flex gap-4 text-[10px] font-bold">
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-krishi-lime" />
                            <span className="text-krishi-lime">HEALTHY</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-krishi-amber" />
                            <span className="text-krishi-amber">WARNING</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <span className="text-red-500">CRITICAL</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                      {gridData.map((grid) => (
                        <motion.div
                          key={grid.id}
                          whileHover={{ scale: 1.1, zIndex: 10 }}
                          onClick={() => setSelectedSector(grid)}
                          className={`aspect-square rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all border border-black/5 hover:shadow-lg ${
                            grid.statusColor === "healthy" ? "bg-krishi-lime" :
                            grid.statusColor === "warning" ? "bg-krishi-amber" :
                            "bg-red-500"
                          }`}
                        >
                          <span className="text-[8px] font-bold text-white/40 mb-0.5">#{grid.id}</span>
                          {grid.statusColor === "critical" && <AlertTriangle size={12} className="text-white animate-pulse" />}
                          {grid.statusColor === "warning" && <Activity size={12} className="text-white/80" />}
                        </motion.div>
                      ))}
                    </div>
                    <p className="mt-4 text-[10px] text-foreground/30 font-code text-center uppercase tracking-widest">
                      Color codes derived from real-time N-P-K and moisture sensor payloads
                    </p>
                  </CardContent>
                </Card>

                <div className="space-y-8">
                  <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
                    <Cpu className="text-primary" />
                    {t.iotTitle}
                  </h2>
                  <div className="space-y-4">
                    {[
                      { name: "NPK Soil Probes", status: "Online", icon: Database, val: "94%" },
                      { name: "Thermal Imaging", status: "Active", icon: CloudSun, val: "100%" },
                      { name: "Flow Meter V4", status: "Warning", icon: Droplets, val: "12%" },
                    ].map((sensor) => (
                      <Card key={sensor.name} className="rounded-2xl border-border p-4 hover:border-primary/30 transition-all cursor-pointer group">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-muted rounded-xl group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                  <sensor.icon size={18} />
                              </div>
                              <div>
                                  <p className="text-sm font-bold">{sensor.name}</p>
                                  <p className={`text-[10px] font-bold uppercase tracking-widest ${sensor.status === 'Warning' ? 'text-krishi-amber' : 'text-krishi-lime'}`}>
                                    {sensor.status}
                                  </p>
                              </div>
                            </div>
                            <span className="font-code text-sm font-bold">{sensor.val}</span>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Card className="rounded-[2rem] bg-krishi-black text-white p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Zap size={80} />
                    </div>
                    <p className="text-krishi-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-4">SYSTEM_HEALTH</p>
                    <h4 className="text-2xl font-display mb-2">99.8% Uptime</h4>
                    <p className="text-sm text-white/60">Cloud nodes active.</p>
                  </Card>
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
                  <History className="text-primary" />
                  {t.approvalTitle}
                </h2>
                <Card className="rounded-[2.5rem] border-border shadow-sm overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow>
                        <TableHead className="font-bold">Applicant</TableHead>
                        <TableHead className="font-bold">Location</TableHead>
                        <TableHead className="font-bold">Area</TableHead>
                        <TableHead className="font-bold">Status</TableHead>
                        <TableHead className="text-right font-bold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registrations?.map((reg: any) => (
                        <TableRow key={reg.id} className="hover:bg-muted/10">
                          <TableCell className="font-medium">
                            <div>
                                <p className="font-bold">{reg.aadharName}</p>
                                <p className="text-xs text-foreground/40">{reg.mobile}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">{reg.village}, {reg.district}</p>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{reg.fieldSize} {reg.fieldUnit}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={
                                reg.status === 'pending' ? 'bg-krishi-amber' : 
                                reg.status === 'reviewed' ? 'bg-krishi-lime' : 'bg-muted'
                            }>
                                {reg.status?.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {reg.status === 'pending' && (
                              <div className="flex justify-end gap-2">
                                  <Button size="sm" variant="ghost" className="text-krishi-lime" onClick={() => handleApprove(reg.id)}>
                                    <CheckCircle2 size={18} />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="text-destructive">
                                    <XCircle size={18} />
                                  </Button>
                              </div>
                            )}
                            {reg.status === 'reviewed' && (
                                <span className="text-xs text-krishi-lime font-bold">VERIFIED</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </div>
          </SidebarInset>
        </div>

        <Dialog open={!!selectedSector} onOpenChange={() => setSelectedSector(null)}>
          <DialogContent className="rounded-[2.5rem] p-8 max-w-md border-primary/20 bg-card/95 backdrop-blur-xl">
            <DialogHeader className="space-y-4">
              <div className="flex justify-between items-start">
                <Badge className={`${
                  selectedSector?.statusColor === 'healthy' ? 'bg-krishi-lime' :
                  selectedSector?.statusColor === 'warning' ? 'bg-krishi-amber' : 'bg-red-500'
                } text-white`}>
                  Field ID: {selectedSector?.fieldId}
                </Badge>
                <div className="text-[10px] font-code text-foreground/40">PIN: {selectedSector?.pincode}</div>
              </div>
              <DialogTitle className="text-3xl font-display">{selectedSector?.crop}</DialogTitle>
              <DialogDescription className={`font-code font-bold uppercase ${
                selectedSector?.statusColor === 'healthy' ? 'text-krishi-lime' :
                selectedSector?.statusColor === 'warning' ? 'text-krishi-amber' : 'text-red-500'
              }`}>
                {selectedSector?.status}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 mt-6">
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border border-border">
                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">{t.details.owner}</p>
                  <p className="font-bold text-lg">{selectedSector?.ownerName}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-krishi-gold/5 rounded-2xl border border-krishi-gold/20">
                  <div className="flex items-center gap-2 mb-2 text-krishi-gold">
                    <IndianRupee size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{t.details.revenue}</span>
                  </div>
                  <p className="text-xl font-display font-bold">₹{selectedSector?.revenue?.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-krishi-lime/5 rounded-2xl border border-krishi-lime/20">
                  <div className="flex items-center gap-2 mb-2 text-krishi-lime">
                    <TrendingUp size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{t.details.produced}</span>
                  </div>
                  <p className="text-xl font-headline font-bold">{selectedSector?.produced}</p>
                </div>
              </div>

              <div className="p-6 bg-muted/30 rounded-2xl border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Beaker size={16} className="text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{t.details.nutrients}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-foreground/40">NITROGEN (N)</p>
                    <p className={`font-code font-bold ${selectedSector?.nutrients.n && selectedSector.nutrients.n < 20 ? 'text-red-500' : 'text-primary'}`}>
                      {selectedSector?.nutrients.n} mg/kg
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-foreground/40">PHOSPHORUS (P)</p>
                    <p className={`font-code font-bold ${selectedSector?.nutrients.p && selectedSector.nutrients.p < 15 ? 'text-red-500' : 'text-primary'}`}>
                      {selectedSector?.nutrients.p} mg/kg
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-foreground/40">POTASSIUM (K)</p>
                    <p className={`font-code font-bold ${selectedSector?.nutrients.k && selectedSector.nutrients.k < 20 ? 'text-red-500' : 'text-primary'}`}>
                      {selectedSector?.nutrients.k} mg/kg
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex justify-between text-xs mb-2">
                   <span className="text-foreground/40 uppercase font-bold tracking-tighter">MOISTURE_CONTENT (WATER_LEVEL)</span>
                   <span className={`font-bold ${selectedSector?.moisture && selectedSector.moisture < 20 ? 'text-red-500' : 'text-foreground'}`}>
                    {selectedSector?.moisture}%
                   </span>
                </div>
                <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedSector?.moisture}%` }}
                    className={`h-full ${
                      selectedSector?.moisture && selectedSector.moisture < 20 ? 'bg-red-500' :
                      selectedSector?.moisture && selectedSector.moisture < 35 ? 'bg-krishi-amber' : 'bg-krishi-lime'
                    }`} 
                   />
                </div>
              </div>
            </div>
            
            <Button onClick={() => setSelectedSector(null)} className="w-full mt-6 rounded-full py-6 font-bold bg-foreground text-background">
              Close Report
            </Button>
          </DialogContent>
        </Dialog>

        <Footer />
      </div>
    </SidebarProvider>
  );
}
