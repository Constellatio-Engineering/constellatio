import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mantine/core";
import { RichtextEditorField } from "./RichtextEditorField";

const Template = (args: any) => (
  <Box w={670}>
    <RichtextEditorField {...args} />
  </Box>
);

const meta: Meta = {
  title: "Molecules/RichtextEditorField",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=906-7177&mode=dev",
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["simple", "with-legal-quote"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof RichtextEditorField>;

export const Default: Story = {
  args: {
    variant: "with-legal-quote",
  },
};
