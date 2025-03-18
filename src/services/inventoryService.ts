
import axios from "axios";
import { Item } from "@/types/inventory";
import { AuthService } from "./authService";

const API_URL = "http://localhost:8080/api/inventory";

// Mock data for development (replace with actual API calls in production)
const mockItems: Item[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    itemName: "Paracetamol",
    category: "Medicine",
    quantity: 100,
    unitPrice: 2.50
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174001",
    itemName: "Hand Sanitizer",
    category: "Skin Care",
    quantity: 50,
    unitPrice: 5.00
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174002",
    itemName: "Bandages",
    category: "First Aid",
    quantity: 200,
    unitPrice: 1.25
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174003",
    itemName: "Vitamin C",
    category: "Supplements",
    quantity: 75,
    unitPrice: 7.99
  }
];

export const InventoryService = {
  async getAllItems(): Promise<Item[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Uncomment for real API
      // const authHeader = AuthService.getAuthHeader();
      // const response = await axios.get(API_URL, { headers: authHeader });
      // return response.data;
      
      // Mock response
      return mockItems;
    } catch (error) {
      console.error("Error fetching inventory items:", error);
      throw error;
    }
  },

  async addItem(item: Omit<Item, "id">): Promise<Item> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Uncomment for real API
      // const authHeader = AuthService.getAuthHeader();
      // const response = await axios.post(API_URL, item, { headers: authHeader });
      // return response.data;
      
      // Mock response
      const newItem: Item = {
        id: crypto.randomUUID(),
        ...item
      };
      mockItems.push(newItem);
      return newItem;
    } catch (error) {
      console.error("Error adding inventory item:", error);
      throw error;
    }
  },

  async updateItem(id: string, item: Partial<Item>): Promise<Item> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Uncomment for real API
      // const authHeader = AuthService.getAuthHeader();
      // const response = await axios.put(`${API_URL}/${id}`, item, { headers: authHeader });
      // return response.data;
      
      // Mock response
      const index = mockItems.findIndex(i => i.id === id);
      if (index === -1) throw new Error("Item not found");
      
      mockItems[index] = { ...mockItems[index], ...item };
      return mockItems[index];
    } catch (error) {
      console.error("Error updating inventory item:", error);
      throw error;
    }
  },

  async deleteItem(id: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Uncomment for real API
      // const authHeader = AuthService.getAuthHeader();
      // await axios.delete(`${API_URL}/${id}`, { headers: authHeader });
      
      // Mock response
      const index = mockItems.findIndex(i => i.id === id);
      if (index === -1) throw new Error("Item not found");
      
      mockItems.splice(index, 1);
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      throw error;
    }
  }
};
