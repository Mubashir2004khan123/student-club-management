import { ApplicationStatus } from "@/backend.d";
import type { Application } from "@/backend.d";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockApplications } from "@/data/mockData";
import { Check, ClipboardList, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function formatDate(ts: bigint) {
  return new Date(Number(ts)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Applications() {
  const [applications, setApplications] =
    useState<Application[]>(mockApplications);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = applications.filter(
    (a) => statusFilter === "all" || a.status === statusFilter,
  );

  const handleApprove = (id: string, name: string) => {
    setApplications((prev) =>
      prev.map((a) =>
        a.applicationId === id
          ? { ...a, status: ApplicationStatus.approved }
          : a,
      ),
    );
    toast.success(`${name}'s application approved`);
  };

  const handleReject = (id: string, name: string) => {
    setApplications((prev) =>
      prev.map((a) =>
        a.applicationId === id
          ? { ...a, status: ApplicationStatus.rejected }
          : a,
      ),
    );
    toast.error(`${name}'s application rejected`);
  };

  const pendingCount = applications.filter(
    (a) => a.status === ApplicationStatus.pending,
  ).length;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Applications</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {pendingCount} pending review
          </p>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger
            className="w-40"
            data-ocid="applications.status.select"
          >
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value={ApplicationStatus.pending}>Pending</SelectItem>
            <SelectItem value={ApplicationStatus.approved}>Approved</SelectItem>
            <SelectItem value={ApplicationStatus.rejected}>Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="shadow-card overflow-hidden">
        {filtered.length === 0 ? (
          <div
            className="text-center py-16"
            data-ocid="applications.empty_state"
          >
            <ClipboardList className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No applications found</p>
          </div>
        ) : (
          <Table data-ocid="applications.table">
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Club</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((app, i) => (
                <TableRow
                  key={app.applicationId}
                  data-ocid={`applications.item.${i + 1}`}
                >
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{app.studentName}</p>
                      <p className="text-xs text-muted-foreground">
                        {app.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{app.clubName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(app.appliedAt)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={app.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    {app.status === ApplicationStatus.pending && (
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs gap-1 text-chart-3 border-chart-3/30 hover:bg-chart-3/10"
                          onClick={() =>
                            handleApprove(app.applicationId, app.studentName)
                          }
                          data-ocid={`applications.approve_button.${i + 1}`}
                        >
                          <Check className="w-3.5 h-3.5" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs gap-1 text-destructive border-destructive/30 hover:bg-destructive/10"
                          onClick={() =>
                            handleReject(app.applicationId, app.studentName)
                          }
                          data-ocid={`applications.reject_button.${i + 1}`}
                        >
                          <X className="w-3.5 h-3.5" /> Reject
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
