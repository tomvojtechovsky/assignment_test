import Header from '../../shared/Header';
import Sidebar from './Sidebar';
import Footer from '../../shared/Footer';
import GlobalFilters from '../../filters/global/GlobalFilters';
import { Outlet } from 'react-router-dom';
import { FiltersProvider } from '../../../context/FiltersContext';

export default function DashboardLayout() {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="bg-gray-300 flex-1 flex flex-col overflow-hidden p-2 sm:p-4 md:p-6 lg:p-8">
          <FiltersProvider>
            <div className="sticky z-40">
              <GlobalFilters />
            </div>

            <main className="flex-1 overflow-y-auto">
              <Outlet />
            </main>
          </FiltersProvider>
        </div>
      </div>

      <Footer />
    </div>
  );
}