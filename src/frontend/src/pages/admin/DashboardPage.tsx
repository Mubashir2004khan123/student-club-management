import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { Users, ClipboardList, Shield, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function AdminDashboard() {
  const { clubs, requests, students } = useApp();

  const stats = [
    { title: "Total Students", count: students.length, icon: Users, color: "text-blue-500" },
    { title: "Active Clubs", count: clubs.length, icon: Shield, color: "text-green-500" },
    { title: "Pending Requests", count: requests.filter(r => r.status === "pending").length, icon: ClipboardList, color: "text-amber-500" },
    { title: "Total Memberships", count: clubs.reduce((acc, c) => acc + c.memberCount, 0), icon: Zap, color: "text-purple-500" },
  ];

  const chartData = clubs.map(club => ({
    name: club.name,
    members: club.memberCount
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.count}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Squadron Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="members" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests.slice(0, 5).map((req, i) => (
                <div key={i} className="flex items-center justify-between p-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">{req.studentName}</p>
                    <p className="text-xs text-muted-foreground">Applied to {req.clubName}</p>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${req.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                    {req.status}
                  </div>
                </div>
              ))}
              {requests.length === 0 && (
                <p className="text-sm text-center text-muted-foreground py-4">No recent activity found.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
