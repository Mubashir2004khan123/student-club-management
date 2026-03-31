import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { Shield, ExternalLink, LogOut, Loader2, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";

export default function MyClubsPage() {
  const { myClubs, leaveClub, loading } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-muted/40 p-6 rounded-2xl border-l-4 border-primary">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Shield className="w-6 h-6 mr-3 text-primary" />
            My Active Deployments
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Review and manage your current squadron affiliations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myClubs.map((club) => (
          <Card key={club._id} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Shield className="w-24 h-24" />
             </div>
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full">
                  {club.category} Division
                </Badge>
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">{club.name}</CardTitle>
            </CardHeader>
            <CardContent>
               <CardDescription className="line-clamp-3 mb-4">{club.description}</CardDescription>
               <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-muted/30 p-2 rounded-lg">
                  <Zap className="w-3 h-3 text-primary" />
                  ID-SECURE: {club._id.slice(-8).toUpperCase()}
               </div>
            </CardContent>
            <CardFooter className="flex gap-2">
               <Link to={`/clubs/${club._id}`} className="flex-1">
                 <Button variant="outline" className="w-full text-xs font-bold gap-2">
                   <ExternalLink className="w-3 h-3" />
                   ENTRY UPLINK
                 </Button>
               </Link>
               <Button 
                 variant="ghost" 
                 size="icon" 
                 className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                 disabled={loading}
                 onClick={() => leaveClub(club._id)}
               >
                 {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
               </Button>
            </CardFooter>
          </Card>
        ))}

        {myClubs.length === 0 && (
          <div className="col-span-full py-32 text-center rounded-3xl border-2 border-dashed bg-muted/20 border-border/50">
             <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-muted-foreground opacity-30" />
             </div>
             <h3 className="text-xl font-bold mb-2">Zero Deployments Detected</h3>
             <p className="text-muted-foreground max-w-sm mx-auto mb-6">
               You are not currently enrolled in any squadrons. Active duty is required for system participation.
             </p>
             <Link to="/clubs">
               <Button className="font-bold px-8">Find a Squadron</Button>
             </Link>
          </div>
        )}
      </div>
    </div>
  );
}
