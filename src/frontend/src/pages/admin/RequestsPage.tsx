import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { Check, X, User, Shield, Info } from "lucide-react";
import { toast } from "sonner";

export default function RequestsPage() {
  const { requests, approveRequest, rejectRequest, loading } = useApp();

  const pendingRequests = requests.filter(r => r.status === "pending");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Inbound Applications</h2>
        <p className="text-muted-foreground">Review and authorize student deployment into squadrons</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pendingRequests.map((req) => (
          <Card key={req._id} className="hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{req.studentName}</h3>
                    <p className="text-sm text-muted-foreground">{req.email}</p>
                    <div className="mt-2 flex gap-2">
                       <span className="inline-flex items-center text-xs px-2 py-1 bg-muted rounded-full">
                         <Shield className="w-3 h-3 mr-1" />
                         Target: {req.clubName}
                       </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  <Button 
                    variant="outline" 
                    className="flex-1 md:flex-initial text-destructive border-destructive/20 hover:bg-destructive/10"
                    onClick={() => rejectRequest(req._id)}
                    disabled={loading}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button 
                    className="flex-1 md:flex-initial"
                    onClick={() => approveRequest(req._id)}
                    disabled={loading}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Authorize
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {pendingRequests.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed rounded-2xl bg-muted/20">
            <Info className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">All Clear</h3>
            <p className="text-muted-foreground">No pending applications in the pipeline.</p>
          </div>
        )}
      </div>
    </div>
  );
}
