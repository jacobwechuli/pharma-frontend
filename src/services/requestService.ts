
import axios from "axios";
import { Request } from "@/types/request";
import { AuthService } from "./authService";

const API_URL = "http://localhost:8080/api/request";

// Mock data for development (replace with actual API calls in production)
const mockRequests: Request[] = [
  {
    id: "456e7890-a12b-34c5-d678-901234567890",
    managerId: "123e4567-e89b-12d3-a456-426614174000",
    itemId: "123e4567-e89b-12d3-a456-426614174000",
    quantity: 10,
    status: "PENDING"
  },
  {
    id: "456e7890-a12b-34c5-d678-901234567891",
    managerId: "123e4567-e89b-12d3-a456-426614174000",
    itemId: "123e4567-e89b-12d3-a456-426614174001",
    quantity: 5,
    status: "APPROVED"
  },
  {
    id: "456e7890-a12b-34c5-d678-901234567892",
    managerId: "123e4567-e89b-12d3-a456-426614174000",
    itemId: "123e4567-e89b-12d3-a456-426614174002",
    quantity: 20,
    status: "REJECTED"
  }
];

export interface CreateRequestPayload {
  managerId: string;
  itemId: string;
  quantity: number;
}

export const RequestService = {
  async getAllRequests(): Promise<Request[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Uncomment for real API
      // const authHeader = AuthService.getAuthHeader();
      // const response = await axios.get(API_URL, { headers: authHeader });
      // return response.data;
      
      // Mock response
      return mockRequests;
    } catch (error) {
      console.error("Error fetching requests:", error);
      throw error;
    }
  },

  async createRequest(request: CreateRequestPayload): Promise<Request> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Uncomment for real API
      // const authHeader = AuthService.getAuthHeader();
      // const response = await axios.post(API_URL, request, { headers: authHeader });
      // return response.data;
      
      // Mock response
      const newRequest: Request = {
        id: crypto.randomUUID(),
        ...request,
        status: "PENDING"
      };
      mockRequests.push(newRequest);
      return newRequest;
    } catch (error) {
      console.error("Error creating request:", error);
      throw error;
    }
  },

  async updateRequestStatus(id: string, status: "APPROVED" | "REJECTED"): Promise<Request> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Uncomment for real API
      // const authHeader = AuthService.getAuthHeader();
      // const response = await axios.put(`${API_URL}/${id}?status=${status}`, {}, { headers: authHeader });
      // return response.data;
      
      // Mock response
      const index = mockRequests.findIndex(r => r.id === id);
      if (index === -1) throw new Error("Request not found");
      
      mockRequests[index] = { ...mockRequests[index], status };
      return mockRequests[index];
    } catch (error) {
      console.error("Error updating request status:", error);
      throw error;
    }
  }
};
