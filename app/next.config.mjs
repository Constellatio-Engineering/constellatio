/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
export const defaultLocale = "de";

await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/linux-x64',
      ],
    },
  },
  images:{
    domains: ["storage.googleapis.com"]
  },
  reactStrictMode: true,
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
