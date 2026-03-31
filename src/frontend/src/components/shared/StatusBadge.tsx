import { ApplicationStatus } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles: Record<ApplicationStatus, string> = {
  [ApplicationStatus.pending]: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  [ApplicationStatus.approved]: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  [ApplicationStatus.rejected]:
    "bg-destructive/10 text-destructive border-destructive/20",
};

export default function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium capitalize", statusStyles[status])}
    >
      {status}
    </Badge>
  );
}
