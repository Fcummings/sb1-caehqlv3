import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Welcome to CLKK</h1>
          <p className="text-gray-300 mb-4">
            You're signed in as: {currentUser?.email}
          </p>
          <Button
            onClick={logout}
            variant="outline"
            className="text-white border-gray-600 hover:bg-gray-700"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}