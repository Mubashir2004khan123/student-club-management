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
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/AppContext";
import { clubAPI } from "@/lib/api";
import { Plus, Trash2, Shield, Search } from "lucide-react";
import { toast } from "sonner";

export default function AdminClubsPage() {
  const { clubs, refreshData } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("social");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddClub = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await clubAPI.createClub({ name, description, category });
      toast.success("Squadron activated!");
      setShowAdd(false);
      setName("");
      setDescription("");
      refreshData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const filteredClubs = clubs.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold">Squadron Command</h2>
          <p className="text-muted-foreground">Manage active university clubs and divisions</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)}>
          <Plus className="w-4 h-4 mr-2" />
          {showAdd ? "Cancel" : "New Squadron"}
        </Button>
      </div>

      {showAdd && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Activate New Squadron</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddClub} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Squadron Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Tactical Chess Division" required />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <select 
                  className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="social">Social</option>
                  <option value="arts">Arts</option>
                  <option value="academic">Academic</option>
                  <option value="sports">Sports</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Directives & Description</Label>
                <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Main objective of this squadron..." required />
              </div>
              <Button type="submit" className="md:col-start-2 place-self-end w-full md:w-auto">Confirm Activation</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          className="pl-10" 
          placeholder="Filter squadrons by name or category..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => (
          <Card key={club._id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div className="text-xs font-mono uppercase px-2 py-1 bg-muted rounded-full">
                  {club.category}
                </div>
              </div>
              <CardTitle className="mt-4">{club.name}</CardTitle>
              <CardDescription className="line-clamp-2">{club.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="w-4 h-4 mr-2" />
                {club.memberCount} Personnel Active
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 pt-4 flex justify-end">
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                <Trash2 className="w-4 h-4 mr-2" />
                Decommission
              </Button>
            </CardFooter>
          </Card>
        ))}
        {filteredClubs.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed rounded-xl">
            <p className="text-muted-foreground">No squadrons matching criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Users({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
