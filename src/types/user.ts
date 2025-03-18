
export interface User {
  id: string;
  username: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "DISTRIBUTOR" | "CFO";
}
