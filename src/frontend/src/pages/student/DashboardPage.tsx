import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useApp } from "@/context/AppContext";
import { Shield, ClipboardList, Calendar, Users, ArrowRight, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export default function StudentDashboard() {
  const { user } = useAuth();
  const { myClubs, requests, clubs } = useApp();

  const myPendingRequests = requests.filter(r => r.studentId === user?._id && r.status === 'pending');

  const stats = [
    { title: "Active Squadrons", count: myClubs.length, icon: Shield, color: "text-blue-500", link: "/my-clubs" },
    { title: "Pending Requests", count: myPendingRequests.length, icon: ClipboardList, color: "text-amber-500", link: "/clubs" },
    { title: "Directives Secure", count: 0, icon: Zap, color: "text-green-500", link: "#" },
    { title: "Open Positions", count: clubs.length - myClubs.length, icon: Users, color: "text-purple-500", link: "/clubs" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-primary-foreground/10 rounded-2xl p-8 text-primary-foreground relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold font-display tracking-tight">Mission Briefing</h1>
            <p className="mt-2 text-primary-foreground/80 max-w-md">
              Welcome back, {user?.name}. Your tactical overview for LG-9 Student Club Management is update.
            </p>
          </div>
          <div className="flex gap-3">
             <Link to="/clubs">
               <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold border-0 px-6">
                 Browse Squadrons
               </Button>
             </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Shield className="w-48 h-48 -rotate-12" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Link key={i} to={stat.link} className="flex">
          <Card className="hover:shadow-card-hover transition-all duration-300 w-full group cursor-pointer border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color} group-hover:scale-110 transition-transform`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.count}</div>
            </CardContent>
          </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Deployments</CardTitle>
              <CardDescription>Clubs you are currently stationed with</CardDescription>
            </div>
            <Link to="/my-clubs">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myClubs.slice(0, 3).map((club) => (
                <div key={club._id} className="flex items-center justify-between p-4 bg-muted/40 rounded-xl hover:bg-muted/60 transition-colors border-l-4 border-primary">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-background rounded-lg shadow-sm">
                       <Shield className="w-5 h-5 text-primary" />
                     </div>
                     <div>
                       <p className="font-bold text-sm">{club.name}</p>
                       <p className="text-xs text-muted-foreground">{club.category} Division</p>
                     </div>
                  </div>
                  <Link to={`/clubs/${club._id}`}>
                    <Button variant="outline" size="sm" className="px-3 py-1 h-8 rounded-lg text-xs font-bold">UPLINK</Button>
                  </Link>
                </div>
              ))}
              {myClubs.length === 0 && (
                <div className="text-center py-12 bg-muted/20 rounded-xl border-2 border-dashed">
                   <p className="text-sm text-muted-foreground">Currently no active deployments.</p>
                   <Link to="/clubs">
                     <Button variant="link" className="mt-2">Join a Squadron</Button>
                   </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Pipeline</CardTitle>
            <CardDescription>Status of your pending requests</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {myPendingRequests.length > 0 ? (
                  myPendingRequests.map((req) => (
                    <div key={req._id} className="flex flex-col p-3 border border-border/50 rounded-xl bg-muted/10">
                       <div className="flex justify-between items-center mb-1">
                         <span className="text-sm font-bold truncate max-w-[140px]">{req.clubName}</span>
                         <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-bold uppercase tracking-wider">
                           Pending
                         </span>
                       </div>
                       <p className="text-[10px] text-muted-foreground italic mb-2">Awaiting command authorization</p>
                       <div className="w-full bg-muted rounded-full h-1">
                          <div className="bg-amber-400 h-1 rounded-full w-1/3 animate-pulse"></div>
                       </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                     <ClipboardList className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-30" />
                     <p className="text-xs text-muted-foreground">No active applications.</p>
                  </div>
                )}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
