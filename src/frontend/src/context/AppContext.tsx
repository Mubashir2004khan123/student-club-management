import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { clubAPI, adminAPI } from "@/lib/api";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface AppContextType {
  clubs: any[];
  myClubs: any[];
  requests: any[];
  students: any[];
  refreshData: () => Promise<void>;
  joinClub: (clubId: string) => Promise<void>;
  leaveClub: (clubId: string) => Promise<void>;
  approveRequest: (requestId: string) => Promise<void>;
  rejectRequest: (requestId: string) => Promise<void>;
  loading: boolean;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [clubs, setClubs] = useState<any[]>([]);
  const [myClubs, setMyClubs] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshData = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const clubsData = await clubAPI.getClubs();
      setClubs(clubsData);

      if (user?.role === "admin") {
        const reqsData = await adminAPI.getApplications();
        setRequests(reqsData);
        const studentsData = await adminAPI.getStudents();
        setStudents(studentsData);
      } else {
        const studentClubs = clubsData.filter((c: any) => 
          c.members.some((m: any) => m === user?._id || m._id === user?._id)
        );
        setMyClubs(studentClubs);
      }
    } catch (error: any) {
      console.error("Failed to load data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated, user?._id]);

  const joinClub = async (clubId: string) => {
    try {
      await clubAPI.joinClub(clubId);
      toast.success("Join request sent to admin");
      refreshData();
    } catch (error: any) {
      toast.error(error.message || "Failed to join club");
    }
  };

  const leaveClub = async (clubId: string) => {
    try {
      await clubAPI.leaveClub(clubId);
      toast.success("Left club successfully");
      refreshData();
    } catch (error: any) {
      toast.error(error.message || "Failed to leave club");
    }
  };

  const approveRequest = async (requestId: string) => {
    try {
      await adminAPI.approveApplication(requestId);
      toast.success("Request approved");
      refreshData();
    } catch (error: any) {
      toast.error(error.message || "Failed to approve request");
    }
  };

  const rejectRequest = async (requestId: string) => {
    try {
      await adminAPI.rejectApplication(requestId);
      toast.success("Request rejected");
      refreshData();
    } catch (error: any) {
      toast.error(error.message || "Failed to reject request");
    }
  };

  return (
    <AppContext.Provider
      value={{
        clubs,
        myClubs,
        requests,
        students,
        refreshData,
        joinClub,
        leaveClub,
        approveRequest,
        rejectRequest,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
