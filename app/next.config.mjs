/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    appDir: false,
  },
  productionBrowserSourceMaps: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true
  },
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
  i18n: {
    locales: ["de"],
    defaultLocale: "de",
  },
};

export default config;
