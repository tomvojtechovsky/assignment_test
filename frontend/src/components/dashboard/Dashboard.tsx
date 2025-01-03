// components/dashboard/Dashboard.tsx
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
 const { logout } = useAuth();

 return (
   <div className="min-h-screen bg-gray-100">
     <nav className="bg-white shadow-sm">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between">
         <h1 className="text-xl font-semibold">Security Dashboard</h1>
         <button
           onClick={logout}
           className="text-gray-600 hover:text-gray-800"
         >
           Logout
         </button>
       </div>
     </nav>
     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <p>Dashboard content will go here</p>
     </main>
   </div>
 );
}