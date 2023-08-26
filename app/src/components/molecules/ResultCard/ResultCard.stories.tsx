import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import { ResultCard } from "./ResultCard";

const Template: FunctionComponent = (args: any) => (
  <Box w={640}>
    <ResultCard {...args}/>
  </Box>
);

const meta: Meta = {
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=51-4110&mode=dev",
    },
  },
  title: "Molecules/Gamification/ResultCard",
};

export default meta;

type Story = StoryObj<typeof ResultCard>;

export const Win: Story = {
  args: {
    droppedCorrectCards: 3,
    message: "Congrats! all answers are correct!",
    totalCorrectCards: 3,
    variant: "win",
  },
};

export const Lose: Story = {
  args: {
    droppedCorrectCards: 2,
    message: "some of your answers are incorrect",
    totalCorrectCards: 3,
    variant: "lose",
  },
};

export const IncorrectOrder: Story = {
  args: {
    droppedCorrectCards: 3,
    message: "some of your answers are in incorrect order",
    totalCorrectCards: 3,
    variant: "lose",
  },
};
