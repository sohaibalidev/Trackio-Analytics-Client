import api, { API_URL } from "./api";

export const authService = {
  getCurrentUser: async () => {
    const res = await api.get("/api/auth/me");
    return res.data;
  },

  loginWithGoogle: () => {
    window.location.href = `${API_URL}/api/auth/google`;
  },

  logout: async () => {
    await api.post("/api/auth/logout");
    window.location.href = "/login";
  },
};
