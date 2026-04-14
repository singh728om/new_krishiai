"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { useSettings } from "@/context/settings-context";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { collection, query, where, orderBy } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sprout, FileText, IndianRupee, MapPin, Clock } from "lucide-react";
import Link from "next/link";

export default function LandOwnerDashboard() {
  const { user, loading } = useUser();
  const { lang } = useSettings();
  const router = useRouter();
  const firestore = useFirestore();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  const leaseQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, "landLeaseRegistrations"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
  }, [firestore, user]);

  const { data: leases } = useCollection(leaseQuery);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const t = {
    title: lang === 'en' ? "Land Owner Dashboard" : "ज़मीन मालिक डैशबोर्ड",
    subtitle: lang === 'en' ? "Manage your leased land and track payments." : "अपनी लीज पर दी गई जमीन का प्रबंधन करें और भुगतान ट्रैक करें।",
    noLeases: lang === 'en' ? "You haven't registered any land yet." : "आपने अभी तक कोई जमीन पंजीकृत नहीं की है।",
    register: lang === 'en' ? "Lease My Land" : "अपनी जमीन पट्टे पर दें",
    status: {
      pending: lang === 'en' ? "Verification Pending" : "सत्यापन लंबित",
      reviewed: lang === 'en' ? "Active & Verified" : "सक्रिय और सत्यापित",
      rejected: lang === 'en' ? "Review Failed" : "सत्यापन विफल",
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <section className="flex-1 py-24 container mx-auto px-6 max-w-5xl">
        <header className="mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-display">{t.title}</h1>
          <p className="text-xl text-foreground/60">{t.subtitle}</p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <h2 className="text-2xl font-headline font-bold">{lang === 'en' ? "Your Registrations" : "आपके पंजीकरण"}</h2>
            
            {leases && leases.length > 0 ? (
              leases.map((lease: any) => (
                <Card key={lease.id} className="rounded-[2rem] overflow-hidden border-border shadow-sm">
                  <CardHeader className="bg-muted/30 border-b">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 text-primary rounded-xl">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{lease.village}, {lease.district}</CardTitle>
                          <CardDescription>{lease.fieldSize} {lease.fieldUnit}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={lease.status === 'reviewed' ? 'default' : 'secondary'} className={lease.status === 'reviewed' ? 'bg-krishi-lime' : ''}>
                        {t.status[lease.status as keyof typeof t.status] || lease.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Expected Payout</p>
                        <p className="text-2xl font-display flex items-center gap-1">
                          <IndianRupee size={20} className="text-primary" />
                          {(lease.fieldSize * 3500).toLocaleString()} <span className="text-xs text-foreground/40 font-body">/month</span>
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Submitted On</p>
                        <p className="font-bold flex items-center gap-2">
                          <Clock size={16} className="text-foreground/40" />
                          {lease.createdAt?.toDate().toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {lease.status === 'reviewed' && (
                      <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <FileText className="text-primary" />
                            <span className="text-sm font-medium">Digital Agreement #KR-{lease.id.slice(0,6).toUpperCase()}</span>
                         </div>
                         <Button variant="ghost" size="sm" className="text-primary font-bold">View Agreement</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-24 bg-muted/10 rounded-[3rem] border border-dashed border-border space-y-6">
                <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto text-foreground/20">
                  <Sprout size={40} />
                </div>
                <p className="text-foreground/40 font-medium">{t.noLeases}</p>
                <Link href="/lease-registration">
                  <Button className="rounded-full px-8">{t.register}</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-8">
             <Card className="rounded-[2.5rem] bg-krishi-black text-white p-8 border-none overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <IndianRupee size={120} />
                </div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-krishi-gold mb-8">Income Summary</h4>
                <div className="space-y-6">
                   <div>
                      <p className="text-4xl font-display text-white">₹0</p>
                      <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Total Earned</p>
                   </div>
                   <div className="pt-6 border-t border-white/10">
                      <p className="text-xl font-headline text-krishi-lime">₹0</p>
                      <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Next Payout: 1st Proximo</p>
                   </div>
                </div>
             </Card>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
