import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: "blue" | "green" | "amber" | "rose";
}

const colorMap = {
  blue: "bg-primary/10 text-primary",
  green: "bg-chart-3/10 text-chart-3",
  amber: "bg-chart-4/10 text-chart-4",
  rose: "bg-chart-5/10 text-chart-5",
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  color = "blue",
}: StatCardProps) {
  return (
    <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="mt-1 text-3xl font-display font-bold text-foreground">
              {value}
            </p>
            {trend && (
              <p
                className={cn(
                  "mt-1 text-xs font-medium",
                  trendUp ? "text-chart-3" : "text-destructive",
                )}
              >
                {trendUp ? "↑" : "↓"} {trend}
              </p>
            )}
          </div>
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              colorMap[color],
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
