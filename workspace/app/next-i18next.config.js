const path = require("path");
const defaultLocale = "de";

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  i18n: {
    /**
     * Caution: If you change this, you need apply the same changes in `next.config.mjs` as well, as this is duplicated there for now.
     * There is currently no workaround for this since `next-i18next` does not support esm.
     */
    defaultLocale: defaultLocale,
    locales: [defaultLocale],
  },
  react: {
    useSuspense: false
  },
  // https://github.com/i18next/next-i18next#notes
  localePath: path.resolve("./public/locales"),
};
