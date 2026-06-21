import { AuthGuard } from "@/components/auth/AuthGuard";

export default function Home() {
  return (
    <AuthGuard>
      <main className="flex min-h-screen items-center justify-center bg-surface-base">
        <div className="space-y-3 text-center">
          <h1 className="font-display text-5xl font-bold text-brand">NocToc</h1>
          <p className="text-sm uppercase tracking-widest text-white/50">
            Authenticated — Phase 1 complete
          </p>
        </div>
      </main>
    </AuthGuard>
  );
}
