import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          {/* Logo a copyright */}
          <div className="flex items-center">
            <FontAwesomeIcon 
              icon={faShieldHalved} 
              className="h-4 w-4 text-type-all mr-2"
            />
            <span className="text-xs text-gray-600">
              MIDARAI © {currentYear}
            </span>
          </div>

          {/* Navigační odkazy */}
          <nav className="flex space-x-4 text-xs">
            <Link 
              to="/" 
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Hlavní
            </Link>
            <Link 
              to="/dashboard" 
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}