import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mantine/core";
import { ResultCard } from "./ResultCard";

const Template = (args: any) => (
  <Box w={640}>
    <ResultCard {...args} />
  </Box>
);

const meta: Meta = {
  title: "Molecules/Gamification/ResultCard",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=51-4110&mode=dev",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ResultCard>;

export const Win: Story = {
  args: {
    variant: "win",
    message: "Congrats! all answers are correct!",
    totalCorrectCards: 3,
    droppedCorrectCards: 3,
  },
};

export const Lose: Story = {
  args: {
    variant: "lose",
    message: "some of your answers are incorrect",
    totalCorrectCards: 3,
    droppedCorrectCards: 2,
  },
};

export const IncorrectOrder: Story = {
  args: {
    variant: "lose",
    message: "some of your answers are in incorrect order",
    totalCorrectCards: 3,
    droppedCorrectCards: 3,
  },
};
