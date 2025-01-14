import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { TYPE_COLORS } from '../../constants/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldHalved, 
  faRightFromBracket, 
  faLock, 
  faBars,
  faTimes 
} from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Hlavní stránka' },
    { to: '/dashboard', label: 'Security Dashboard' },
  ];

  const isDashboardActive = location.pathname.startsWith('/dashboard');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 relative z-40 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo sekce - vždy viditelná */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-900 hover:text-type-all transition-colors shrink-0"
          >
            <FontAwesomeIcon
              icon={faShieldHalved}
              className={`h-6 w-6 text-type-all ${TYPE_COLORS.main.text}`}
            />
            <span className="text-xl font-bold">MIDARAI</span>
          </Link>

          {/* Mobilní menu toggle */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-type-all focus:outline-none"
            >
              <FontAwesomeIcon 
                icon={isMobileMenuOpen ? faTimes : faBars} 
                className="h-6 w-6" 
              />
            </button>
          </div>

          {/* Desktop navigace */}
          <nav className="hidden md:flex items-center justify-end flex-1 space-x-8">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap
                    ${(item.to === '/dashboard' && isDashboardActive) ||
                    (item.to === '/' && location.pathname === '/')
                    ? 'text-type-all after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-type-all after:rounded-full'
                    : 'text-gray-600 hover:text-gray-900'}
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Auth tlačítko pro desktop */}
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium
                  text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap"
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="h-4 w-4"
                />
                <span>Odhlásit se</span>
              </button>
            ) : (
              <Link
                to="/login"
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium
                  bg-type-all text-white rounded-lg hover:bg-type-all/90 
                  transition-colors whitespace-nowrap ${TYPE_COLORS.main.button.active}`}
              >
                <FontAwesomeIcon
                  icon={faLock}
                  className="h-4 w-4"
                />
                <span>Přihlásit se</span>
              </Link>
            )}
          </nav>
        </div>

        {/* Mobilní menu */}
        {isMobileMenuOpen && (
          <div className="
            md:hidden 
            fixed 
            inset-x-0 
            top-16 
            bg-white 
            border-t 
            border-gray-200 
            shadow-lg 
            z-50 
            animate-slide-down
          ">
            <nav className="px-4 pt-4 pb-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={toggleMobileMenu}
                  className={`
                    block py-2 px-4 rounded-lg transition-colors
                    ${(item.to === '/dashboard' && isDashboardActive) ||
                    (item.to === '/' && location.pathname === '/')
                    ? 'bg-type-all/10 text-type-all'
                    : 'text-gray-600 hover:bg-gray-100'}
                  `}
                >
                  {item.label}
                </Link>
              ))}

              {/* Auth tlačítko pro mobil */}
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                    toggleMobileMenu();
                  }}
                  className="w-full text-left py-2 px-4 rounded-lg text-gray-600 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="h-4 w-4"
                  />
                  <span>Odhlásit se</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={toggleMobileMenu}
                  className="w-full block py-2 px-4 bg-type-all text-white rounded-lg hover:bg-type-all/90 text-center"
                >
                  Přihlásit se
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}