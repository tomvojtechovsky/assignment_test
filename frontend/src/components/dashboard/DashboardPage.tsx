import { useTableData } from '../../hooks/useTableData';

export default function DashboardPage() {
  const { data, loading, error } = useTableData(15, 0);

  // Debug výpis do konzole
  console.log('Raw data:', data);

  if (loading) return <div>Načítání...</div>;
  if (error) return <div>Chyba: {error.message}</div>;

  return (
    <div>
      <h1>Data ze serveru:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}