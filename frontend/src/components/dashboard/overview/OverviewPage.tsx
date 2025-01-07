// components/dashboard/overview/OverviewPage.tsx
import MetricsCards from "./MetricsCards";
import QuickInsights from "./QuickInsights";

export default function OverviewPage() {
  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold mb-6">Přehled</h1>
      <div className="">
        <MetricsCards />
        <QuickInsights />
      </div>
    </div>
  );
}