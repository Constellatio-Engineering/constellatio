import { Meta, StoryObj } from "@storybook/react";
import { withDesign } from "storybook-addon-designs";
import { Box } from "@mantine/core";
import { AlertCard } from "./AlertCard";

const Template = (args: any) => (
  <Box w={500}>
    <AlertCard {...args} />
  </Box>
);

const meta: Meta = {
  title: "Atoms/AlertCard",
  component: Template,
  decorators: [withDesign],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=55-6533&mode=dev",
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AlertCard>;

export const ErrorCard: Story = {
  args: {
    children:
      "Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint",
    variant: "error",
  },
};

export const SuccessCard: Story = {
  args: {
    children:
      "Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint",
    variant: "success",
  },
};
