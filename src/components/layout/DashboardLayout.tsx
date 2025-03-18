
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { PackageOpen, ShoppingCart, Users, ClipboardCheck, CreditCard, LogOut, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthService } from "@/services/authService";

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  path: string;
  active: boolean;
  onClick: () => void;
};

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => (
  <Button
    variant="ghost"
    className={`w-full justify-start gap-3 p-2 ${
      active ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
    }`}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </Button>
);

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  
  useEffect(() => {
    // In a real application, you would decode the JWT token to get the user role
    // For now, we'll simulate it
    const simulateGetUserRole = () => {
      // Normally would decode JWT stored in localStorage
      // This is just a placeholder
      return localStorage.getItem("userRole") || "MANAGER";
    };
    
    setUserRole(simulateGetUserRole());
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    {
      icon: <PackageOpen size={20} />,
      label: "Inventory",
      path: "/dashboard/inventory",
      allowedRoles: ["ADMIN", "MANAGER", "DISTRIBUTOR", "CFO"],
    },
    {
      icon: <ShoppingCart size={20} />,
      label: "Requests",
      path: "/dashboard/requests",
      allowedRoles: ["ADMIN", "MANAGER", "CFO"],
    },
    {
      icon: <ClipboardCheck size={20} />,
      label: "Approvals",
      path: "/dashboard/approvals",
      allowedRoles: ["CFO"],
    },
    {
      icon: <CreditCard size={20} />,
      label: "Transactions",
      path: "/dashboard/transactions",
      allowedRoles: ["CFO", "ADMIN"],
    },
    {
      icon: <Users size={20} />,
      label: "Users",
      path: "/dashboard/users",
      allowedRoles: ["ADMIN"],
    },
  ];

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(item => 
    userRole && item.allowedRoles.includes(userRole)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar - desktop always visible, mobile as overlay */}
      <aside
        className={`
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 fixed md:sticky top-0 left-0 z-30
          w-64 h-screen bg-white border-r border-gray-200 shadow-sm
          transition-transform duration-200 ease-in-out
        `}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-700">PharmaPlus</h1>
          <p className="text-sm text-gray-500 mt-1">
            {userRole ? userRole.charAt(0) + userRole.slice(1).toLowerCase() : "Loading..."}
          </p>
        </div>

        <nav className="p-4 space-y-1">
          {filteredNavItems.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              active={location.pathname === item.path}
              onClick={() => navigateTo(item.path)}
            />
          ))}
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-4 space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 text-gray-600"
            onClick={() => navigateTo("/dashboard/profile")}
          >
            <User size={20} />
            <span>Profile</span>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-3 text-gray-600"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 px-4 py-8 md:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
