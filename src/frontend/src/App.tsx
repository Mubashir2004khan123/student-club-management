import { Toaster } from "@/components/ui/sonner";
import { AppProvider, useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import Layout from "@/components/layout/DashboardLayout";
import LoginPage from "@/pages/Login";
import AdminClubsPage from "@/pages/admin/ClubsPage";
import AdminDashboard from "@/pages/admin/DashboardPage";
import RequestsPage from "@/pages/admin/RequestsPage";
import StudentsPage from "@/pages/admin/StudentsPage";
import StudentClubsPage from "@/pages/student/ClubsPage";
import StudentDashboard from "@/pages/student/DashboardPage";
import MyClubsPage from "@/pages/student/MyClubsPage";
import ProfilePage from "@/pages/student/ProfilePage";
import EventsPage from "@/pages/Events";
import AnnouncementsPage from "@/pages/Announcements";
import SettingsPage from "@/pages/Settings";
import ReportsPage from "@/pages/Reports";


function AppRoot() {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  );
}

function RoleGuard({ allowedRole }: { allowedRole: "admin" | "student" }) {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) return <Navigate to="/" />;
  if (user?.role !== allowedRole) return <Navigate to="/dashboard" />;
  
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}

const rootRoute = createRootRoute({
  component: AppRoot,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) return <Navigate to="/dashboard" />;
    return <LoginPage />;
  }
});

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: Layout,
});

// Protected root for all logged in users
const protectedRoute = createRoute({
  getParentRoute: () => layoutRoute,
  id: "protected",
  component: () => (
    <AppProvider>
      <Outlet />
    </AppProvider>
  )
});

const dashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/dashboard",
  component: () => {
    const { user } = useAuth();
    if (user?.role === "admin") return <AdminDashboard />;
    return <StudentDashboard />;
  },
});

const adminGuardRoute = createRoute({
  getParentRoute: () => layoutRoute,
  id: "admin-guard",
  component: () => <RoleGuard allowedRole="admin" />,
});

const studentGuardRoute = createRoute({
  getParentRoute: () => layoutRoute,
  id: "student-guard",
  component: () => <RoleGuard allowedRole="student" />,
});

const adminStudentsRoute = createRoute({
  getParentRoute: () => adminGuardRoute,
  path: "/members",
  component: StudentsPage,
});

const adminRequestsRoute = createRoute({
  getParentRoute: () => adminGuardRoute,
  path: "/applications",
  component: RequestsPage,
});

const clubsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/clubs",
  component: () => {
    const { user } = useAuth();
    if (user?.role === "admin") return <AdminClubsPage />;
    return <StudentClubsPage />;
  },
});

const myClubsRoute = createRoute({
  getParentRoute: () => studentGuardRoute,
  path: "/my-clubs",
  component: MyClubsPage,
});

const profileRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/profile",
  component: ProfilePage,
});

const eventsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/events",
  component: EventsPage,
});

const announcementsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/announcements",
  component: AnnouncementsPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/settings",
  component: SettingsPage,
});

const reportsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/reports",
  component: ReportsPage,
});


const routeTree = rootRoute.addChildren([
  loginRoute,
  layoutRoute.addChildren([
    protectedRoute.addChildren([
        dashboardRoute,
        clubsRoute,
        profileRoute,
        eventsRoute,
        announcementsRoute,
        settingsRoute,
        reportsRoute,
    ]),
    adminGuardRoute.addChildren([adminStudentsRoute, adminRequestsRoute]),
    studentGuardRoute.addChildren([myClubsRoute]),
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
