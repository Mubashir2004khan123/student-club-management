const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const authAPI = {
  login: (credentials) => apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  }),
  register: (userData) => apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  }),
};

export const clubAPI = {
  getClubs: () => apiFetch("/clubs"),
  getClubById: (id) => apiFetch(`/clubs/${id}`),
  createClub: (clubData) => apiFetch("/clubs", {
    method: "POST",
    body: JSON.stringify(clubData),
  }),
  joinClub: (id) => apiFetch(`/clubs/${id}/join`, {
    method: "POST",
  }),
  leaveClub: (id) => apiFetch(`/clubs/${id}/leave`, {
    method: "POST",
  }),
};

export const adminAPI = {
  getApplications: () => apiFetch("/admin/applications"),
  approveApplication: (id) => apiFetch(`/admin/applications/${id}/approve`, {
    method: "PUT",
  }),
  rejectApplication: (id) => apiFetch(`/admin/applications/${id}/reject`, {
    method: "PUT",
  }),
  getStudents: () => apiFetch("/admin/students"),
};
