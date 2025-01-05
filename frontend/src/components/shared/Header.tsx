// components/shared/Header.tsx
/**
* Hlavní navigační komponenta
* Zobrazuje:
* - Logo/název aplikace
* - Hlavní navigační menu
* - Přihlašovací/odhlašovací tlačítko
*/
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
 const { isAuthenticated, logout } = useAuth();
 const location = useLocation();

 // Navigační položky
 const navItems = [
   { to: '/', label: 'Hlavní stránka' },
   { to: '/dashboard', label: 'Security Dashboard' },
 ];

 // Kontrola, zda je aktivní dashboard sekce
 const isDashboardActive = location.pathname.startsWith('/dashboard');

 return (
   <header className="bg-white shadow">
     <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
       <Link to="/" className="text-lg font-semibold text-gray-800">
         DataFlow
       </Link>
       <nav className="flex items-center space-x-4">
         {navItems.map((item) => (
           <Link
             key={item.to}
             to={item.to}
             className={`text-gray-600 hover:text-gray-800 ${
               (item.to === '/dashboard' && isDashboardActive) || 
               (item.to === '/' && location.pathname === '/') 
                 ? 'font-bold text-blue-500' 
                 : ''
             }`}
           >
             {item.label}
           </Link>
         ))}
         {isAuthenticated ? (
           <button 
             onClick={logout} 
             className="text-gray-600 hover:text-gray-800"
           >
             Odhlásit se
           </button>
         ) : (
           <Link 
             to="/login" 
             className="text-gray-600 hover:text-gray-800"
           >
             Přihlásit se
           </Link>
         )}
       </nav>
     </div>
   </header>
 );
}