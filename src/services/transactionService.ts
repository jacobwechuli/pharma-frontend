
import axios from "axios";
import { Transaction } from "@/types/transaction";
import { AuthService } from "./authService";

const API_URL = "http://localhost:8080/api/transactions";

// Mock data for development (replace with actual API calls in production)
const mockTransactions: Transaction[] = [
  {
    id: "tx123",
    approvalId: "456e7890-a12b-34c5-d678-901234567891",
    amount: 500.00,
    paidAt: "2025-03-15T12:30:00Z"
  },
  {
    id: "tx124",
    approvalId: "456e7890-a12b-34c5-d678-901234567893",
    amount: 750.50,
    paidAt: "2025-03-16T09:45:00Z"
  }
];

export interface RecordPaymentPayload {
  approvalId: string;
  amount: number;
}

export const TransactionService = {
  async getAllTransactions(): Promise<Transaction[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Uncomment for real API
      // const authHeader = AuthService.getAuthHeader();
      // const response = await axios.get(API_URL, { headers: authHeader });
      // return response.data;
      
      // Mock response
      return mockTransactions;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  },

  async recordPayment(payment: RecordPaymentPayload): Promise<Transaction> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Uncomment for real API
      // const authHeader = AuthService.getAuthHeader();
      // const response = await axios.post(API_URL, payment, { headers: authHeader });
      // return response.data;
      
      // Mock response
      const newTransaction: Transaction = {
        id: `tx${Math.floor(Math.random() * 1000)}`,
        ...payment,
        paidAt: new Date().toISOString()
      };
      mockTransactions.push(newTransaction);
      return newTransaction;
    } catch (error) {
      console.error("Error recording payment:", error);
      throw error;
    }
  }
};
