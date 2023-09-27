import type { Preview } from "@storybook/react";

import CustomThemingProvider from "../src/provider/CustomThemingProvider";

const customViewports = {
  Bronze: {
    name: "Bronze",
    styles: {
      height: "100%",
      width: "640px",
    },
  },
  Diamond: {
    name: "Diamond",
    styles: {
      height: "100%",
      width: "1920px",
    },
  },
  Gold: {
    name: "Gold",
    styles: {
      height: "100%",
      width: "1280px",
    },
  },
  Platinum: {
    name: "Platinum",
    styles: {
      height: "100%",
      width: "1440px",
    },
  },
  Silver: {
    name: "Silver",
    styles: {
      height: "100%",
      width: "768px",
    },
  },
  ipad: {
    name: "iPad",
    styles: {
      height: "1024px",
      width: "768px",
    },
  },
  ipadMini: {
    name: "iPad landscape",
    styles: {
      height: "768px",
      width: "1024px",
    },
  },
  iphoneX: {
    name: "iPhone X",
    styles: {
      height: "812px",
      width: "375px",
    },
  },
  pixel: {
    name: "Google Pixel",
    styles: {
      height: "732px",
      width: "412px",
    },
  },
};

const preview: Preview = {
  decorators: [
    (Story) => (
      <CustomThemingProvider>
        <Story/>
      </CustomThemingProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: customViewports,
    },
  },
};

export default preview;
