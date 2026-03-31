import { Category } from "@/backend.d";
import StatCard from "@/components/shared/StatCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockClubs, mockEvents, mockMembers } from "@/data/mockData";
import { CalendarDays, TrendingUp, Users, Users2 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const eventsPerMonth = [
  { month: "Sep", events: 2 },
  { month: "Oct", events: 4 },
  { month: "Nov", events: 3 },
  { month: "Dec", events: 1 },
  { month: "Jan", events: 5 },
  { month: "Feb", events: 7 },
  { month: "Mar", events: 8 },
];

const memberGrowth = [
  { month: "Sep", members: 24 },
  { month: "Oct", members: 38 },
  { month: "Nov", members: 52 },
  { month: "Dec", members: 61 },
  { month: "Jan", members: 79 },
  { month: "Feb", members: 108 },
  { month: "Mar", members: 289 },
];

const categoryData = Object.values(Category).map((cat) => ({
  name: cat.charAt(0).toUpperCase() + cat.slice(1),
  value: mockClubs.filter((c) => c.category === cat).length,
}));

const CHART_COLORS = [
  "oklch(0.5 0.2 264)",
  "oklch(0.58 0.18 200)",
  "oklch(0.55 0.17 145)",
  "oklch(0.65 0.18 50)",
];

export default function Reports() {
  const totalMembers = mockMembers.length;
  const totalEvents = mockEvents.length;
  const totalClubs = mockClubs.length;
  const avgMembersPerClub = Math.round(totalMembers / totalClubs);

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-display text-2xl font-bold">Reports & Analytics</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Overview of student club activity
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Clubs"
          value={totalClubs}
          icon={Users2}
          color="blue"
        />
        <StatCard
          title="Total Members"
          value={totalMembers}
          icon={Users}
          color="green"
        />
        <StatCard
          title="Total Events"
          value={totalEvents}
          icon={CalendarDays}
          color="amber"
        />
        <StatCard
          title="Avg. Members / Club"
          value={avgMembersPerClub}
          icon={TrendingUp}
          color="rose"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-base">
              Events per Month
            </CardTitle>
            <CardDescription className="text-xs">
              Academic year 2025–2026
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={eventsPerMonth}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
                />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(var(--card))",
                    border: "1px solid oklch(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="events"
                  fill="oklch(0.5 0.2 264)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-base">
              Clubs by Category
            </CardTitle>
            <CardDescription className="text-xs">
              Distribution across all categories
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(var(--card))",
                    border: "1px solid oklch(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend iconSize={10} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-display text-base">
            Member Growth
          </CardTitle>
          <CardDescription className="text-xs">
            Cumulative membership over the academic year
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart
              data={memberGrowth}
              margin={{ top: 4, right: 20, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(var(--card))",
                  border: "1px solid oklch(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="members"
                stroke="oklch(0.5 0.2 264)"
                strokeWidth={2}
                dot={{ fill: "oklch(0.5 0.2 264)", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
