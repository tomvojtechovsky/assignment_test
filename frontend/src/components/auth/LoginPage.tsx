// LoginPage.tsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../shared/Header';
import { useAuth } from '../../context/AuthContext';
import LoginForm from './LoginForm';

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="flex items-center justify-center py-20">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Přihlášení
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Pro vstup do aplikace se přihlaste pomocí svého účtu.
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
