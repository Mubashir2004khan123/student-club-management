import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { Search, Shield, Zap, Info, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function StudentClubsPage() {
  const { clubs, myClubs, requests, joinClub, loading } = useApp();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "social", "arts", "academic", "sports"];

  const filteredClubs = clubs.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getClubStatus = (clubId: string) => {
    const isMember = myClubs.some(c => c._id === clubId);
    if (isMember) return "member";
    const hasPending = requests.some(r => r.clubId === clubId && r.studentId === user?._id && r.status === "pending");
    if (hasPending) return "pending";
    return "none";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Squadron Directory</h2>
          <p className="text-muted-foreground">Find and join new divisions in the university</p>
        </div>
      </div>

      <Card className="p-4 border-primary/20 bg-primary/5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-10" 
              placeholder="Search squadrons by callsign or description..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="capitalize text-xs font-mono"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => {
          const status = getClubStatus(club._id);
          return (
            <Card key={club._id} className="group hover:scale-[1.02] transition-transform duration-300 border-border/50 overflow-hidden">
               <div className="h-2 bg-primary/20"></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline" className="text-[10px] uppercase font-mono tracking-tighter">
                    {club.category}
                  </Badge>
                  {status === "member" && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                      ENROLLED
                    </Badge>
                  )}
                  {status === "pending" && (
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">
                      AWAITING COMMAND
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{club.name}</CardTitle>
                <CardDescription className="line-clamp-2 mt-2">{club.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-xs text-muted-foreground font-mono">
                  <Zap className="w-3 h-3 mr-1 text-primary" />
                  STRENGTH: {club.memberCount} MEMBERS
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button 
                  className="w-full font-bold h-10 group-hover:shadow-lg transition-all"
                  variant={status === "none" ? "default" : "ghost"}
                  disabled={status !== "none" || loading}
                  onClick={() => joinClub(club._id)}
                >
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {status === "member" ? "ACTIVE DUTY" : status === "pending" ? "IN PIPELINE" : "REQUEST ENROLLMENT"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
        {filteredClubs.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed rounded-3xl bg-muted/10 opacity-50">
             <Info className="w-12 h-12 mx-auto mb-4" />
             <h3 className="text-lg font-medium">Radar Clear</h3>
             <p className="text-sm">No squadrons detected in the selected sector.</p>
          </div>
        )}
      </div>
    </div>
  );
}
