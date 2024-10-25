/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
export const defaultLocale = "de";

await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    // bundlePagesExternals: process.env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "development", currently not working because of mantine
    optimizePackageImports: [
      "@mantine/*",
      "@tabler/icons-react",
      "@tiptap/*"
    ],
  },
  images:{
    remotePatterns: [
      {
        hostname: "assets.caisy.io",
        protocol: "https",
        port: '',
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: '',
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: '',
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: '',
      },
    ],
  },
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  logging: {
    fetches: {
      fullUrl: false
    }
  },
  productionBrowserSourceMaps: process.env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "production",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true
  },
  i18n: {
    /**
     * Caution: If you change this, you need apply the same changes in `next-i18next.config.js` as well, as this is duplicated there for now.
     * There is currently no workaround for this since `next-i18next` does not support esm.
     */
    defaultLocale: defaultLocale,
    locales: [defaultLocale],
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
};

export default config;
