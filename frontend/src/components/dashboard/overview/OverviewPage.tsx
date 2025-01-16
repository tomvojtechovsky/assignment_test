// components/dashboard/overview/OverviewPage.tsx
import MetricsCards from "./MetricsCards";
import QuickInsights from "./QuickInsights";

export default function OverviewPage() {
  return (
    <div className="mr-4">
      <MetricsCards />
      <QuickInsights />
    </div>
  );
}