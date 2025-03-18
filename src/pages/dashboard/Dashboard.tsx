
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { User, PackageOpen, ShoppingCart, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InventoryService } from "@/services/inventoryService";
import { RequestService } from "@/services/requestService";
import { TransactionService } from "@/services/transactionService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalItems: 0,
    totalRequests: 0,
    pendingRequests: 0,
    totalTransactions: 0,
    totalTransactionAmount: 0,
  });

  const [categoryData, setCategoryData] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch items
        const items = await InventoryService.getAllItems();
        const totalItems = items.length;
        
        // Calculate category distribution
        const categoryMap = items.reduce((acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        const categoryChartData = Object.entries(categoryMap).map(([name, count]) => ({
          name,
          count,
        }));
        
        // Fetch requests
        const requests = await RequestService.getAllRequests();
        const totalRequests = requests.length;
        const pendingRequests = requests.filter(req => req.status === "PENDING").length;
        
        // Fetch transactions
        const transactions = await TransactionService.getAllTransactions();
        const totalTransactions = transactions.length;
        const totalTransactionAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);
        
        setStats({
          totalItems,
          totalRequests,
          pendingRequests,
          totalTransactions,
          totalTransactionAmount,
        });
        
        setCategoryData(categoryChartData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory Items</CardTitle>
            <PackageOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalItems}</div>
            <p className="text-xs text-muted-foreground">
              Items in stock
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRequests}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-yellow-600">{stats.pendingRequests} pending</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTransactions}</div>
            <p className="text-xs text-muted-foreground">
              Processed payments
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalTransactionAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              From all transactions
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Inventory by Category</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="mr-4 space-y-1">
                  <p className="text-sm font-medium leading-none">New request submitted</p>
                  <p className="text-sm text-muted-foreground">Manager requested 10 Paracetamol items</p>
                </div>
                <div className="ml-auto font-medium">Just now</div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Request approved</p>
                  <p className="text-sm text-muted-foreground">CFO approved request #456e78</p>
                </div>
                <div className="ml-auto font-medium">2h ago</div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Payment processed</p>
                  <p className="text-sm text-muted-foreground">Payment of $500.00 recorded</p>
                </div>
                <div className="ml-auto font-medium">Yesterday</div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 space-y-1">
                  <p className="text-sm font-medium leading-none">New item added</p>
                  <p className="text-sm text-muted-foreground">Admin added 'Vitamin C' to inventory</p>
                </div>
                <div className="ml-auto font-medium">2d ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
