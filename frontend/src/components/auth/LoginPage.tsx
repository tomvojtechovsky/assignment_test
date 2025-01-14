// LoginPage.tsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginForm from './LoginForm';
import Header from '../shared/Header';
import Footer from '../shared/Footer';

// LoginPage.tsx
export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 w-full">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg mx-4">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Přihlášení
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Pro vstup do MIDARAI se přihlaste
          </p>
          <LoginForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}