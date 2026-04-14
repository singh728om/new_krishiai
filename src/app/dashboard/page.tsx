
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
  Bell,
  CheckCircle2,
  XCircle,
  Activity,
  Cpu,
  Database,
  ShieldCheck,
  ArrowUpRight
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
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { collection, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { useMemoFirebase } from "@/firebase/firestore/use-collection";

// Mock data for the 50-grid heatmap
const generateGridData = () => {
  return Array.from({ length: 50 }, (_, i) => ({
    id: i,
    health: Math.floor(Math.random() * 40) + 60, // 60-100%
    moisture: Math.floor(Math.random() * 30) + 40, // 40-70%
    isAnomalous: Math.random() > 0.9,
  }));
};

export default function DashboardPage() {
  const { lang } = useSettings();
  const { user } = useUser();
  const firestore = useFirestore();
  const [gridData] = useState(generateGridData());

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
    title: lang === 'en' ? "Command Center" : "कमांड सेंटर",
    subtitle: lang === 'en' ? "Staff Intelligence Dashboard - Uttar Pradesh Clusters" : "स्टाफ इंटेलिजेंस डैशबोर्ड - उत्तर प्रदेश क्लस्टर",
    heatmapTitle: lang === 'en' ? "Varanasi Cluster Field Heatmap" : "वाराणसी क्लस्टर फील्ड हीटमैप",
    iotTitle: lang === 'en' ? "IOT Sensor Network" : "आईओटी सेंसर नेटवर्क",
    approvalTitle: lang === 'en' ? "Lease Approval Queue" : "लीज अनुमोदन कतार",
    carbonTitle: lang === 'en' ? "Carbon Credit Ledger" : "कार्बन क्रेडिट लेजर",
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-24 container mx-auto px-6">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
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

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Heatmap Section */}
          <Card className="lg:col-span-2 rounded-[2.5rem] border-border shadow-sm overflow-hidden bg-card">
            <CardHeader className="border-b border-border/50 p-8">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl font-headline font-bold">{t.heatmapTitle}</CardTitle>
                  <CardDescription>Precision monitoring of 50 farm sectors in Varanasi Cluster #09</CardDescription>
                </div>
                <div className="flex gap-2">
                   <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-krishi-lime" />
                      <span className="text-[10px] font-bold text-foreground/40">HEALTHY</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-krishi-amber" />
                      <span className="text-[10px] font-bold text-foreground/40">WARNING</span>
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
                    className={`aspect-square rounded-lg flex items-center justify-center cursor-help transition-colors border border-black/5 ${
                      grid.isAnomalous 
                      ? "bg-krishi-amber" 
                      : grid.health > 90 
                        ? "bg-krishi-lime" 
                        : "bg-krishi-lime/60"
                    }`}
                    title={`Sector ${grid.id}: Health ${grid.health}%`}
                  >
                    {grid.isAnomalous && <Activity size={12} className="text-white animate-pulse" />}
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-border/50 grid grid-cols-2 md:grid-cols-4 gap-6">
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-foreground/40">AVG HEALTH</p>
                    <p className="text-xl font-bold">92.4%</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-foreground/40">MOISTURE LVL</p>
                    <p className="text-xl font-bold">58%</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-foreground/40">SENSORS ON</p>
                    <p className="text-xl font-bold">48/50</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-foreground/40">RISK INDEX</p>
                    <p className="text-xl font-bold text-krishi-lime">STABLE</p>
                 </div>
              </div>
            </CardContent>
          </Card>

          {/* IOT Status Sidebar */}
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
               <p className="text-sm text-white/60 mb-6">AI models are processing 4,200 requests/sec across all UP clusters.</p>
               <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 rounded-full font-bold">
                  View Logs
               </Button>
            </Card>
          </div>
        </div>

        {/* Approval Queue Section */}
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
                {(!registrations || registrations.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-foreground/40">
                       No pending registrations found in queue.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  );
}

