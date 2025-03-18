
import axios from "axios";

const API_URL = "http://localhost:8080/api";

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: string;
}

export const AuthService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  async register(username: string, email: string, password: string, role: string): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
        role,
      });
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  logout(): void {
    // In a real app with JWT, just remove the token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
  },

  // This is a helper method to get the Authorization header
  getAuthHeader(): { Authorization: string } | undefined {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : undefined;
  },

  // For demo purposes only - in real app would decode JWT
  simulateUserRole(): string {
    return localStorage.getItem("userRole") || "MANAGER";
  }
};
