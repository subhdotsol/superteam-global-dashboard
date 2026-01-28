import { MainDashboard } from "@/components/dashboard/main-dashboard";
import { loadDashboardData } from "@/lib/data";

export default function HomePage() {
  const stats = loadDashboardData();

  return <MainDashboard stats={stats} />;
}
