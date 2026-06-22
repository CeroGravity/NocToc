import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// authDomain for your project — must match NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
const FIREBASE_AUTH_DOMAIN = "noctoc-404.firebaseapp.com";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' https://image.tmdb.org data: blob:",
  "media-src 'self' blob:",
  "font-src 'self'",
  "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com",
  `frame-src 'self' https://${FIREBASE_AUTH_DOMAIN} https://apis.google.com`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  // Pin the workspace root to this subproject. A stray yarn.lock exists in the
  // parent dir (the older NocToc app), which otherwise makes Next infer the
  // wrong root.
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "image.tmdb.org" }],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
