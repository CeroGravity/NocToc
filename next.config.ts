import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this subproject. A stray yarn.lock exists in the
  // parent dir (the older NocToc app), which otherwise makes Next infer the
  // wrong root.
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "image.tmdb.org" },
    ],
  },
};

export default nextConfig;
