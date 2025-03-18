
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-4">PharmaPlus</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced pharmaceutical inventory and supply chain management system
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Streamline Your Pharmaceutical Operations
            </h2>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-600">Comprehensive inventory management</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-600">Efficient request and approval workflow</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-600">Secure role-based access control</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-600">Complete transaction monitoring</span>
              </li>
            </ul>
            <div className="space-x-4">
              <Button
                size="lg"
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Sign In
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/register")}
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Create Account
              </Button>
            </div>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Key Features</h3>
              <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                Enterprise Ready
              </span>
            </div>
            <div className="space-y-4">
              <div className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-medium text-blue-700">User Authentication & Roles</h4>
                <p className="text-sm text-gray-500 mt-1">Secure access control for Admin, Manager, Distributor, and CFO roles</p>
              </div>
              <div className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-medium text-blue-700">Inventory Management</h4>
                <p className="text-sm text-gray-500 mt-1">Efficiently add, update, and monitor your pharmaceutical inventory</p>
              </div>
              <div className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-medium text-blue-700">Request System</h4>
                <p className="text-sm text-gray-500 mt-1">Streamlined process for managers to create requests and CFOs to approve</p>
              </div>
              <div className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-medium text-blue-700">Transaction Management</h4>
                <p className="text-sm text-gray-500 mt-1">Comprehensive payment tracking and financial reporting</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
