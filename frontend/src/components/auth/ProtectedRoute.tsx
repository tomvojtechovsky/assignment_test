import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Pokud není uživatel přihlášen, přesměrujeme na login
    return <Navigate to="/login" replace />;
  }

  // Pokud je přihlášen, zobrazíme děti (chráněný obsah)
  return <>{children}</>;
}
