// components/dashboard/layout/Sidebar.tsx

/**
* Boční navigační panel
* Obsahuje:
* - Logo/název aplikace
* - Navigační odkazy na jednotlivé sekce
* - Případně tlačítko pro odhlášení
*/
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function Sidebar() {
 const location = useLocation();
 const { logout } = useAuth();

 // Seznam navigačních položek
 const navigationItems = [
   { path: '/dashboard', label: 'Přehled', icon: '📊' },
   { path: '/dashboard/data', label: 'Data', icon: '📋' },
   { path: '/dashboard/analytics', label: 'Analýzy', icon: '📈' }
 ];

 return (
   <aside className="w-64 bg-white shadow-lg">
     {/* Záhlaví sidebaru */}
     <div className="p-4 border-b">
       <h2 className="text-xl font-bold">DataFlow</h2>
     </div>

     {/* Navigační menu */}
     <nav className="mt-6">
       {navigationItems.map(item => (
         <Link
           key={item.path}
           to={item.path}
           className={`
             flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50
             ${location.pathname === item.path ? 'bg-blue-50 border-r-4 border-blue-500' : ''}
           `}
         >
           <span className="mr-3">{item.icon}</span>
           <span>{item.label}</span>
         </Link>
       ))}
     </nav>

   </aside>
 );
}