import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
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
          include: ["../src/components/"],
        },
      },
    },
  ],
  // eslint-disable-next-line @typescript-eslint/require-await
  babel: async (options) => ({
    ...options,
    presets: [...options.presets || [], "@emotion/babel-preset-css-prop"],
  }),
  docs: {
    autodocs: true,
  },
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
};

export default config;
