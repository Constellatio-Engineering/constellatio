import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mantine/core";
import { RecoverPage } from "./RecoverPage";

const Template = (args: any) => (
  <Box w={350}>
    <RecoverPage {...args} />
  </Box>
);

const meta: Meta = {
  title: "Pages/RecoverPage",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=48-4837&mode=design&t=fUYGnKtkoyjTfrLF-4",
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RecoverPage>;

export const Default: Story = {
  args: {},
};
