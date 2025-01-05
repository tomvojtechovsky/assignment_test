import Header from '../../shared/Header';
import Sidebar from './Sidebar';
import GlobalFilters from '../../filters/global/GlobalFilters';
import { Outlet } from 'react-router-dom';
import { FiltersProvider } from '../../../context/FiltersContext';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <FiltersProvider>
          <GlobalFilters />
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </FiltersProvider>
      </div>
    </div>
  );
}