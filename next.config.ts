import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site 100 % statique : `next build` génère `out/`, servi par le Worker Cloudflare.
  output: "export",
  images: { unoptimized: true },
  devIndicators: false,
};

export default nextConfig;
