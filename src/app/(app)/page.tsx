import { Banner } from "@/components/banner/Banner";

// Render per request so the Banner's random featured title varies per view
// instead of being frozen at build time.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="min-h-screen bg-surface-base pb-20">
      <Banner />
      <div className="mt-6 px-4 md:px-10">
        <p className="text-sm text-white/40">Rows arrive in Phase 5.</p>
      </div>
    </main>
  );
}
