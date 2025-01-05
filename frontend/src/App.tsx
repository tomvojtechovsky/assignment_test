// App.tsx
/**
 * Hlavní komponenta aplikace
 * Zajišťuje:
 * - Správu stavu přihlášení (AuthProvider)
 * - Routování mezi stránkami
 * - Základní layout aplikace
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './components/auth/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LandingPage from './components/landing/LandingPage';
import DashboardLayout from './components/dashboard/layout/DashboardLayout';
import OverviewPage from './components/dashboard/overview/OverviewPage';
import DataPage from './components/dashboard/data/DataPage';
import AnalyticsPage from './components/dashboard/analytics/AnalyticsPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<OverviewPage />} />
            <Route path="data" element={<DataPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;