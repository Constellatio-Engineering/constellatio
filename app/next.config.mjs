/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { createRequire } from 'module'
const nodeRequire = createRequire(import.meta.url)
const i18nextConfig = nodeRequire('./next-i18next.config.js')

export const defaultLocale = "de";

await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    appDir: false,
  },
  compiler: {
    emotion: true,
  },
  productionBrowserSourceMaps: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true
  },
  i18n: i18nextConfig.i18n,
  swcMinify: true,
  async headers()
  {
    return [
      {
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, must-revalidate"
          }
        ],
        locale: false,
        source: "/:all*(svg|jpg|png)"
      }
    ];
  },
};

export default config;
