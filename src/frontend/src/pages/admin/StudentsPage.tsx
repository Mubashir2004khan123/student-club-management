import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApp } from "@/context/AppContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Mail } from "lucide-react";

export default function StudentsPage() {
  const { students } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Personnel Directory</h2>
          <p className="text-muted-foreground">Monitor and manage all students and their deployments</p>
        </div>
      </div>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-[300px]">Personnel</TableHead>
              <TableHead>Email Address</TableHead>
              <TableHead>Squadron Deployments</TableHead>
              <TableHead className="text-right">System Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id} className="hover:bg-muted/30 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                        {student.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">{student.name}</span>
                      <span className="text-xs font-mono uppercase bg-muted px-1 rounded inline-block w-fit">
                        {student.role}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-mono text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    {student.email}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {student.clubs && student.clubs.length > 0 ? (
                      student.clubs.map((club: any) => (
                        <Badge key={club._id} variant="secondary" className="text-[10px] uppercase font-bold py-0">
                          <Shield className="w-2.5 h-2.5 mr-1" />
                          {club.name}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded italic">
                        Unassigned
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 ring-1 ring-green-600/20">
                    Active
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {students.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No personnel records found in the directory.</p>
          </div>
        )}
      </div>
    </div>
  );
}
