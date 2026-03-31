import { Role } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const roleStyles: Record<Role, string> = {
  [Role.admin]: "bg-destructive/10 text-destructive border-destructive/20",
  [Role.leader]: "bg-primary/10 text-primary border-primary/20",
  [Role.student]: "bg-muted text-muted-foreground border-border",
};

export default function RoleBadge({ role }: { role: Role }) {
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium capitalize", roleStyles[role])}
    >
      {role}
    </Badge>
  );
}
