import { useAuth } from "@/context/AuthContext";
import { useApp } from "@/context/AppContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Mail, User, LogOut, Settings, Award, History } from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { myClubs } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="relative h-48 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-3xl overflow-hidden border border-primary/20">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="absolute bottom-0 left-0 p-8 flex items-end gap-6 translate-y-1/2">
           <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
             <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-bold">
               {user?.avatar}
             </AvatarFallback>
           </Avatar>
        </div>
      </div>

      <div className="pt-12 flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
           <h1 className="text-3xl font-bold font-display">{user?.name}</h1>
           <p className="text-muted-foreground flex items-center mt-1">
             <Mail className="w-4 h-4 mr-2" />
             {user?.email}
           </p>
           <div className="mt-4 flex gap-2">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-bold px-3 py-1 uppercase tracking-widest text-[10px]">
                {user?.role} Personnel
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-bold px-3 py-1 uppercase tracking-widest text-[10px]">
                System Active
              </Badge>
           </div>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" size="sm" className="hidden md:flex">
             <Settings className="w-4 h-4 mr-2" />
             Config
           </Button>
           <Button variant="destructive" size="sm" onClick={logout} className="font-bold">
             <LogOut className="w-4 h-4 mr-2" />
             Exit System
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
         <Card className="md:col-span-2">
            <CardHeader className="border-b bg-muted/20 pb-4">
              <CardTitle className="text-lg flex items-center">
                 <Shield className="w-5 h-5 mr-3 text-primary" />
                 Active Sector Deployments
              </CardTitle>
              <CardDescription>Clubs and divisions you are currently assigned to</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
               <div className="space-y-4">
                  {myClubs.map((club) => (
                    <div key={club._id} className="flex items-center justify-between p-4 border rounded-2xl hover:bg-muted/30 transition-all">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                             <Award className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-sm">{club.name}</p>
                            <p className="text-xs text-muted-foreground">{club.category} Sector</p>
                          </div>
                       </div>
                       <Button variant="ghost" size="sm" className="text-primary hover:text-primary font-bold">UPLINK</Button>
                    </div>
                  ))}
                  {myClubs.length === 0 && (
                    <div className="py-12 text-center text-muted-foreground bg-muted/10 rounded-2xl border-2 border-dashed">
                      <p>No active deployments detected.</p>
                    </div>
                  )}
               </div>
            </CardContent>
         </Card>

         <div className="space-y-6">
            <Card>
               <CardHeader className="pb-3 border-b bg-muted/20">
                 <CardTitle className="text-base flex items-center">
                   <History className="w-4 h-4 mr-2 text-primary" />
                   Recent Operations
                 </CardTitle>
               </CardHeader>
               <CardContent className="pt-4 px-0">
                  <div className="space-y-1">
                     <div className="px-4 py-2 hover:bg-muted/50 text-xs">
                        <span className="font-bold block">Auth Success</span>
                        <span className="text-muted-foreground">Session initiated successfully.</span>
                        <span className="text-[10px] text-muted-foreground/60 block mt-1">Today, 14:32</span>
                     </div>
                     <div className="px-4 py-2 hover:bg-muted/50 text-xs">
                        <span className="font-bold block">Entry Authorized</span>
                        <span className="text-muted-foreground border-l-2 border-primary pl-2 ml-1">Assigned to LG-9 Base Operations.</span>
                        <span className="text-[10px] text-muted-foreground/60 block mt-1">Yesterday, 10:15</span>
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
               <CardHeader className="pb-3">
                  <CardTitle className="text-base">System Directives</CardTitle>
               </CardHeader>
               <CardContent className="text-xs space-y-3">
                  <div className="flex gap-3">
                     <div className="h-5 w-5 rounded bg-primary/20 flex items-center justify-center text-primary">1</div>
                     <p className="text-muted-foreground">Maintain active participation in assigned squadrons.</p>
                  </div>
                  <div className="flex gap-3">
                     <div className="h-5 w-5 rounded bg-primary/20 flex items-center justify-center text-primary">2</div>
                     <p className="text-muted-foreground">Report any system discrepancies to command headquarters.</p>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
