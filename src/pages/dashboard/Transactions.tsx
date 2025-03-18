
import { useState, useEffect } from "react";
import { Search, Download, DollarSign, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionService } from "@/services/transactionService";
import { RequestService } from "@/services/requestService";
import { Transaction } from "@/types/transaction";
import { Request } from "@/types/request";

const formSchema = z.object({
  approvalId: z.string().min(1, "Please select an approved request"),
  amount: z.coerce.number().positive("Amount must be a positive number"),
});

type FormValues = z.infer<typeof formSchema>;

const Transactions = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [approvedRequests, setApprovedRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<string>("ALL");

  // Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      approvalId: "",
      amount: 0,
    },
  });

  useEffect(() => {
    fetchTransactions();
    fetchApprovedRequests();
  }, []);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const data = await TransactionService.getAllTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast({
        variant: "destructive",
        title: "Failed to load transactions",
        description: "Please try again or contact support if the problem persists.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchApprovedRequests = async () => {
    try {
      const allRequests = await RequestService.getAllRequests();
      const approved = allRequests.filter(req => req.status === "APPROVED");
      setApprovedRequests(approved);
    } catch (error) {
      console.error("Error fetching approved requests:", error);
      toast({
        variant: "destructive",
        title: "Failed to load approved requests",
        description: "Please try again or contact support if the problem persists.",
      });
    }
  };

  const handleRecordPayment = () => {
    setDialogOpen(true);
  };

  const onSubmit = async (values: FormValues) => {
    try {
      await TransactionService.recordPayment({
        approvalId: values.approvalId,
        amount: values.amount,
      });
      
      toast({
        title: "Payment recorded",
        description: "The payment has been recorded successfully.",
      });
      
      setDialogOpen(false);
      fetchTransactions();
    } catch (error) {
      console.error("Error recording payment:", error);
      toast({
        variant: "destructive",
        title: "Failed to record payment",
        description: "Please try again or contact support.",
      });
    }
  };

  const handleExportCSV = () => {
    // In a real app, you would generate and download a CSV file
    toast({
      title: "Export initiated",
      description: "Your transactions export is being prepared.",
    });
  };

  // Filter transactions based on search term and date filter
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         transaction.approvalId.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (dateFilter === "ALL") return matchesSearch;
    
    const txDate = new Date(transaction.paidAt);
    const today = new Date();
    
    switch (dateFilter) {
      case "TODAY":
        return matchesSearch && 
              txDate.getDate() === today.getDate() &&
              txDate.getMonth() === today.getMonth() &&
              txDate.getFullYear() === today.getFullYear();
      case "THIS_WEEK":
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        return matchesSearch && txDate >= weekAgo;
      case "THIS_MONTH":
        const monthAgo = new Date(today);
        monthAgo.setMonth(today.getMonth() - 1);
        return matchesSearch && txDate >= monthAgo;
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Transaction Management</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
          <Button onClick={handleRecordPayment}>
            <DollarSign className="mr-2 h-4 w-4" /> Record Payment
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="w-full sm:w-60">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Time</SelectItem>
              <SelectItem value="TODAY">Today</SelectItem>
              <SelectItem value="THIS_WEEK">This Week</SelectItem>
              <SelectItem value="THIS_MONTH">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <p>Loading transactions...</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Approval ID</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{transaction.approvalId.substring(0, 8)}...</TableCell>
                    <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>{new Date(transaction.paidAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record New Payment</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="approvalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Approved Request</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an approved request" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {approvedRequests.map((request) => (
                          <SelectItem key={request.id} value={request.id}>
                            ID: {request.id.substring(0, 8)}... | Qty: {request.quantity}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Record Payment</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Transactions;
