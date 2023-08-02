import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mantine/core";
import { DragDropGame } from "./DragDropGame";

const Template = (args: any) => (
  <Box w={670}>
    <DragDropGame {...args} />
  </Box>
);

const meta: Meta = {
  title: "Organisms/Gamification/DragDropGame",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=51-4848&mode=dev",
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof DragDropGame>;

export const OrderRelevant: Story = {
  args: {
    game: {
      options: [
        {
          correctAnswer: false,
          id: "mantine-z8s83yqq4",
          label: "incorrect 2",
        },
        {
          correctAnswer: true,
          id: "mantine-cm0emte8g",
          label: "correct 2",
        },
        {
          correctAnswer: false,
          id: "mantine-al6nvyf3p",
          label: "incorrect 1",
        },
        {
          correctAnswer: true,
          id: "mantine-yypgy82zw",
          label: "correct 1",
        },
        {
          correctAnswer: true,
          id: "mantine-16im481b1",
          label: "correct 3",
        },
        {
          correctAnswer: false,
          id: "mantine-z36xuo6x0",
          label: "incorrect 3 ",
        },
      ],
      orderRequired: true,
    },
  },
};

export const OrderIrrelevant: Story = {
  args: {
    game: {
      ...OrderRelevant?.args?.game,
      orderRequired: false,
    },
  },
};
