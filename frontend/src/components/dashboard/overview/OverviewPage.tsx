// components/dashboard/overview/OverviewPage.tsx
import MetricsCards from "./MetricsCards";
import QuickInsights from "./QuickInsights";

export default function OverviewPage() {
  return (
    <div className="mt-4">
      <div className="">
        <MetricsCards />
        <QuickInsights />
      </div>
    </div>
  );
}