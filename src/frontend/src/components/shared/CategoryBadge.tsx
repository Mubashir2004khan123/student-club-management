import { Category } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const categoryStyles: Record<Category, string> = {
  [Category.academic]: "bg-primary/10 text-primary border-primary/20",
  [Category.arts]: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  [Category.sports]: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  [Category.social]: "bg-chart-2/10 text-chart-2 border-chart-2/20",
};

const categoryLabels: Record<Category, string> = {
  [Category.academic]: "Academic",
  [Category.arts]: "Arts",
  [Category.sports]: "Sports",
  [Category.social]: "Social",
};

export default function CategoryBadge({ category }: { category: Category }) {
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium capitalize", categoryStyles[category])}
    >
      {categoryLabels[category]}
    </Badge>
  );
}
