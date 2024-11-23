import { ClientUsageMetrics } from "@/components/ClientUsageMetrics";
import { DashboardMetrics } from "@/components/DashboardMetrics";
import { PersonaList } from "@/components/PersonaList";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold border-b pb-1 mb-2">Dashboard</h1>
      <DashboardMetrics />
      <PersonaList />
      <ClientUsageMetrics />
    </div>
  );
}
