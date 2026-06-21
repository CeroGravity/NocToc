import { AuthGuard } from "@/components/auth/AuthGuard";
import { Header } from "@/components/layout/Header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <Header />
      {children}
    </AuthGuard>
  );
}
