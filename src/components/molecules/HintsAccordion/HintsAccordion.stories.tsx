import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";

import { HintsAccordion } from "./HintsAccordion";

const Template = (args: any) => (
  <Box w={630}>
    <HintsAccordion {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {},
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=1305-3920&mode=dev",
    },
  },
  title: "Molecules/Gamification/HintsAccordion",
};

export default meta;

type Story = StoryObj<typeof HintsAccordion>;

export const Default: Story = {
  args: {
    items: ["Hint 1", "Hint 2", "Hint 3", "Hint 4;Hint 5;Hint 6"],
  },
};
