import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import {
  BarChart3,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  Settings,
  Users,
  Users2,
  X,
  Target,
  User as UserIcon,
} from "lucide-react";

const Sidebar = ({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}) => {
  const { user } = useAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const adminItems = [
    { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
    { label: "Squadron Command", icon: Shield, to: "/clubs" },
    { label: "Inbound Requests", icon: ClipboardList, to: "/applications" },
    { label: "Personnel", icon: Users, to: "/members" },
    { label: "Briefings", icon: Megaphone, to: "/announcements" },
    { label: "Mission Reports", icon: BarChart3, to: "/reports" },
    { label: "Config", icon: Settings, to: "/settings" },
  ];

  const studentItems = [
    { label: "Home Base", icon: LayoutDashboard, to: "/dashboard" },
    { label: "All Squadrons", icon: Target, to: "/clubs" },
    { label: "My Deployments", icon: Users2, to: "/my-clubs" },
    { label: "Events", icon: CalendarDays, to: "/events" },
    { label: "Briefings", icon: Megaphone, to: "/announcements" },
    { label: "My Profile", icon: UserIcon, to: "/profile" },
    { label: "Config", icon: Settings, to: "/settings" },
  ];

  const navItems = user?.role === "admin" ? adminItems : studentItems;

  return (
    <>
      {mobileOpen && (
        <div
          role="presentation"
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-sidebar z-50 flex flex-col transition-all duration-300 ease-in-out border-r border-sidebar-border",
          collapsed ? "w-16" : "w-64",
          "lg:relative lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div
          className={cn(
            "flex items-center h-16 px-4 flex-shrink-0",
            collapsed ? "justify-center" : "justify-between",
          )}
        >
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-sidebar-foreground text-lg tracking-tight">
                LG-9
              </span>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-primary-foreground" />
            </div>
          )}
          <button
            type="button"
            onClick={onMobileClose}
            className="lg:hidden text-sidebar-foreground/60 hover:text-sidebar-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = currentPath === item.to;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={onMobileClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                      collapsed && "justify-center px-0",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <item.icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-sidebar-border group">
           {!collapsed && (
              <div className="bg-muted/50 p-3 rounded-xl mb-4 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    {user?.avatar}
                 </div>
                 <div className="min-w-0">
                    <p className="text-xs font-bold truncate">{user?.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">{user?.role}</p>
                 </div>
              </div>
           )}
          <button
            type="button"
            onClick={onToggle}
            className={cn(
              "flex items-center gap-2 w-full px-2 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all text-xs",
              collapsed && "justify-center",
            )}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse Wing</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

function Shield({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>;
}

export default Sidebar;
