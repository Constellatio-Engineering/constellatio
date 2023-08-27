import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import { Footer } from "./Footer";

const Template: FunctionComponent = (args: any) => (
  <Box maw={1440}>
    <Footer {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "simpleColoredBg", "simpleWhiteBg"],
    },
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=35-5276&mode=dev",
    },
  },
  title: "Organisms/Footer",
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};
