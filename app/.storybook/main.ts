import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-designs",
    "@storybook/addon-styling",
    {
      name: "@storybook/addon-docs",
      options: {
        rule: {
          include: ["../src/components/"], // You can specify directories
        },
      },
    },
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  babel: async (options) => ({
    ...options,
    // @ts-ignore
    presets: [...options.presets, '@emotion/babel-preset-css-prop'],
  }),
  docs: {
    autodocs: true,
  },
};
export default config;
