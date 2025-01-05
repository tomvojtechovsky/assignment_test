// components/dashboard/overview/OverviewPage.tsx
import MetricsCards from "./MetricsCards";

export default function OverviewPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Přehled</h1>
      <div className="">
        <MetricsCards />
        {/* Zde budou další komponenty */}
      </div>
    </div>
  );
}