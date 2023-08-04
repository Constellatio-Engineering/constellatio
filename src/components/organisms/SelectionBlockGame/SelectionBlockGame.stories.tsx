import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mantine/core";
import { SelectionBlockGame } from "./SelectionBlockGame";

const Template = (args: any) => (
  <Box w={670}>
    <SelectionBlockGame {...args} />
  </Box>
);

const meta: Meta = {
  title: "Organisms/Gamification/SelectionBlockGame",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=51-9026&mode=dev",
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof SelectionBlockGame>;

export const Default: Story = {
  args: {},
};
