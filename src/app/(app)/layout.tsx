import { AuthGuard } from "@/components/auth/AuthGuard";
import { Header } from "@/components/layout/Header";
import { MovieModal } from "@/components/modal/MovieModal";
import { ListProvider } from "@/components/providers/ListProvider";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <ListProvider>
        <Header />
        {children}
        <MovieModal />
      </ListProvider>
    </AuthGuard>
  );
}
