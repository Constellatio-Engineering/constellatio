import type { StorybookConfig } from "@storybook/nextjs";
const prettierConfig = require("../.prettierrc");

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-designs",
    {
      name: "@storybook/addon-docs",
      options: {
        rule: {
          include: ["../src/components/"], // You can specify directories
        },
        loaderOptions: {
          prettierConfig,
        },
      },
    },
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
export default config;
