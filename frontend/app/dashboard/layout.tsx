export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Enable auth protection when NextAuth is configured
  return <>{children}</>;
}
