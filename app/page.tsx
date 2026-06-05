import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

export default function Page() {
  // TODO: Enable auth when NextAuth configuration is fully working
  // Redirect to /auth/signin if user is not authenticated
  return <DashboardLayout />;
}
