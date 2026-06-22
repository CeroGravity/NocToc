import type { Metadata, Viewport } from "next";
import { Inter, Syne } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/providers/AuthProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "NocToc", template: "%s · NocToc" },
  description: "Your personal streaming universe — trailers, watchlist, no noise.",
  applicationName: "NocToc",
  openGraph: {
    title: "NocToc",
    description: "Your personal streaming universe.",
    type: "website",
  },
};

// themeColor moved to the viewport export — it is deprecated in `metadata`
// as of Next.js 14 (would emit a build warning if left in metadata).
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${syne.variable}`}
    >
      <body className="bg-surface-base text-white antialiased">
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="bottom-center" theme="dark" />
      </body>
    </html>
  );
}
