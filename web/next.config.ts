import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Sanity-hosted images (avatars, logos, future hero images)
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  // Let devices on the same WiFi load the dev server without HMR noise,
  // regardless of which network we're on. Covers all private IP ranges.
  allowedDevOrigins: ["192.168.*", "10.*", "172.*", "*.local"],
};

export default nextConfig;
