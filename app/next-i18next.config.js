const path = require("path");
const defaultLocale = "de";

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  i18n: {
    defaultLocale: defaultLocale,
    locales: [defaultLocale],
  },
  react: {
    useSuspense: false
  },
  // https://github.com/i18next/next-i18next#notes
  localePath: path.resolve("./public/locales"),
};
