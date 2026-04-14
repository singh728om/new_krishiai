
"use client";

import { useState, useMemo } from "react";
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
  AlertTriangle,
  FileText,
  CreditCard,
  CalendarDays,
  ChevronRight,
  Save,
  Check,
  X,
  Lock
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { collection, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useMemoFirebase } from "@/firebase/firestore/use-collection";
import { useToast } from "@/hooks/use-toast";

interface GridItem {
  id: number;
  fieldId: string;
  isLeased: boolean;
  leaseData?: any;
  produced: string;
  nutrients: { n: number; p: number; k: number };
  moisture: number;
  statusColor: "healthy" | "warning" | "critical" | "inactive";
  status: string;
  irrigationPass: boolean;
  soilTestPass: boolean;
  cropHealthPass: boolean;
}

export default function DashboardPage() {
  const { lang } = useSettings();
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedSector, setSelectedSector] = useState<GridItem | null>(null);
  const [selectedLease, setSelectedLease] = useState<any | null>(null);

  // Fetch all registrations
  const registrationsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "landLeaseRegistrations"), orderBy("createdAt", "desc"));
  }, [firestore]);

  const { data: registrations, loading: loadingRegs } = useCollection(registrationsQuery);

  const pendingRegistrations = useMemo(() => 
    registrations?.filter(r => r.status === 'pending') || [], 
    [registrations]
  );
  
  const activeLeases = useMemo(() => 
    registrations?.filter(r => r.status === 'reviewed') || [], 
    [registrations]
  );

  // Generate 50 Grid Sectors mapping to real leases where available
  const gridData: GridItem[] = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => {
      const lease = activeLeases[i];
      const isLeased = !!lease;
      
      // Mocked sensor data for leased fields
      const moisture = isLeased ? (Math.floor(Math.random() * 40) + 20) : 0;
      const nutrients = isLeased ? {
        n: Math.floor(Math.random() * 60) + 10,
        p: Math.floor(Math.random() * 40) + 10,
        k: Math.floor(Math.random() * 50) + 10,
      } : { n: 0, p: 0, k: 0 };

      let statusColor: GridItem['statusColor'] = "inactive";
      if (isLeased) {
        const avgN = (nutrients.n + nutrients.p + nutrients.k) / 3;
        if (moisture < 25 || avgN < 20) statusColor = "critical";
        else if (moisture < 35 || avgN < 35) statusColor = "warning";
        else statusColor = "healthy";
      }

      return {
        id: i,
        fieldId: `FLD-${2000 + i}`,
        isLeased,
        leaseData: lease,
        produced: isLeased ? (Math.random() * 3 + 1).toFixed(1) + " Tons" : "0",
        nutrients,
        moisture,
        statusColor,
        status: !isLeased ? "Unleased Asset" : statusColor === "healthy" ? "Optimal" : statusColor === "warning" ? "Needs Attention" : "Action Required",
        irrigationPass: isLeased && moisture > 30,
        soilTestPass: isLeased && (nutrients.n + nutrients.p + nutrients.k) > 60,
        cropHealthPass: isLeased && statusColor === "healthy",
      };
    });
  }, [activeLeases]);

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
      title: "Field Intelligence Synced",
      description: `Sector ${selectedSector?.fieldId} monitoring logs updated.`,
    });
    setSelectedSector(null);
  };

  const t = {
    title: lang === 'en' ? "Dashboard" : "डैशबोर्ड",
    subtitle: lang === 'en' ? "Staff Intelligence Dashboard - Uttar Pradesh Clusters" : "स्टाफ इंटेलिजेंस डैशबोर्ड - उत्तर प्रदेश क्लस्टर",
    heatmapTitle: lang === 'en' ? "Field Monitor" : "फील्ड मॉनिटर",
    details: {
      owner: lang === 'en' ? "Land Owner" : "ज़मीन मालिक",
      crop: lang === 'en' ? "Current Crop" : "वर्तमान फसल",
      produced: lang === 'en' ? "Yield Produced" : "उत्पादित पैदावार",
      nutrients: lang === 'en' ? "Soil Nutrients (N-P-K)" : "मिट्टी के पोषक तत्व",
      payout: lang === 'en' ? "Monthly Payout" : "मासिक भुगतान",
    }
  };

  const navItems = [
    { id: "overview", label: lang === 'en' ? "Overview" : "अवलोकन", icon: LayoutDashboard },
    { id: "heatmap", label: lang === 'en' ? "Field Monitor" : "फील्ड मॉनिटर", icon: MapPin },
    { id: "approvals", label: lang === 'en' ? "Lease Queue" : "लीज कतार", icon: History },
    { id: "active_leases", label: lang === 'en' ? "Active Leases" : "सक्रिय लीज", icon: FileText },
    { id: "iot", label: lang === 'en' ? "Sensor Network" : "सेंसर नेटवर्क", icon: Cpu },
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
                      STAFF_PRIVILEGE_ACTIVE
                    </Badge>
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
                            <CardDescription>Live Verification & Diagnostic Heatmap</CardDescription>
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
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-muted" />
                                <span className="text-foreground/20">UNLEASED</span>
                            </div>
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
                        {!activeLeases.length && (
                          <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-dashed border-primary/20 text-center">
                            <p className="text-sm text-primary font-medium italic">All sectors currently unleased. Approve applications in the Lease Queue to activate field monitoring.</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <div className="space-y-8">
                      <Card className="rounded-[2rem] bg-krishi-black text-white p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Database size={80} />
                        </div>
                        <p className="text-krishi-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Verification Stats</p>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <h4 className="text-3xl font-display">{activeLeases.length}</h4>
                              <p className="text-[10px] text-white/40 uppercase">Active</p>
                           </div>
                           <div>
                              <h4 className="text-3xl font-display">{pendingRegistrations.length}</h4>
                              <p className="text-[10px] text-white/40 uppercase">Queue</p>
                           </div>
                        </div>
                      </Card>
                    </div>
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
                          {pendingRegistrations.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-24">
                                <div className="space-y-4 opacity-30">
                                   <History size={48} className="mx-auto" />
                                   <p className="font-medium italic">No pending land lease applications in queue.</p>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
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
                    {activeLeases.length === 0 && (
                      <div className="col-span-full py-24 text-center bg-card border border-dashed border-border rounded-[3rem] opacity-40 italic">
                         No active leases managed. Approve land from the queue to start.
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SidebarInset>
        </div>

        {/* Sector Details Dialog */}
        <Dialog open={!!selectedSector} onOpenChange={() => setSelectedSector(null)}>
          <DialogContent className="rounded-[2.5rem] p-8 max-w-lg border-primary/20 bg-card/95 backdrop-blur-xl">
            <DialogHeader className="space-y-4">
              <div className="flex justify-between items-start">
                <Badge className={`${
                  selectedSector?.statusColor === 'healthy' ? 'bg-krishi-lime' :
                  selectedSector?.statusColor === 'warning' ? 'bg-krishi-amber' : 'bg-red-500'
                } text-white uppercase tracking-widest px-3 py-1`}>
                  Field ID: {selectedSector?.fieldId}
                </Badge>
              </div>
              <DialogTitle className="text-3xl font-display">Sector Diagnostic Report</DialogTitle>
              <DialogDescription className="font-code text-foreground/60">
                Linked Lease Record: #KR-{selectedSector?.leaseData?.id?.slice(0, 4).toUpperCase()}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 mt-6">
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border border-border">
                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">{t.details.owner}</p>
                  <p className="font-bold text-lg">{selectedSector?.leaseData?.aadharName}</p>
                </div>
              </div>

              <div className="p-6 bg-muted/30 rounded-3xl border border-border space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Field Status Check</h4>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm font-medium">
                    <Droplets size={18} className="text-primary" /> Irrigation Log
                  </div>
                  <Badge variant={selectedSector?.moisture! > 30 ? "default" : "destructive"}>
                    {selectedSector?.moisture! > 30 ? "PASS" : "LOW_MOISTURE"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm font-medium">
                    <Beaker size={18} className="text-primary" /> Soil Nutrient Test
                  </div>
                  <Badge variant={selectedSector?.soilTestPass ? "default" : "destructive"}>
                    {selectedSector?.soilTestPass ? "OPTIMAL" : "DEPLETED"}
                  </Badge>
                </div>
              </div>

              <div className="p-6 bg-krishi-black text-white rounded-2xl border border-border">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-white/40 uppercase mb-1">{t.details.produced}</p>
                    <p className="text-lg font-bold">{selectedSector?.produced}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase mb-1">Moisture Level</p>
                    <p className="text-lg font-bold">{selectedSector?.moisture}%</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Button onClick={handleSaveFieldReport} className="w-full rounded-full py-8 mt-8 font-bold bg-primary text-white">
              Sync Diagnostic Report
            </Button>
          </DialogContent>
        </Dialog>

        {/* Lease Deep-Dive Dialog */}
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

