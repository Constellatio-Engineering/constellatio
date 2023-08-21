import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";

import { DragDropGame } from "./DragDropGame";

const Template = (args: any) => (
  <Box w={670}>
    <DragDropGame {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {},
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=51-4848&mode=dev",
    },
  },
  title: "Organisms/Gamification/DragDropGame",
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
    helpNote: {
      id: "7ff9b046-4c5e-4b2c-a081-88f99c98f3ea",
      richTextContent: {
        connections: [],
        json: {
          content: [
            {
              attrs: {
                textAlign: "left",
              },
              content: [
                {
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "Keine Gesellschaften sind also: (1) Stiftungen, (2) Eheliche Lebensgemeinschaften, (3) Erbengemeinschaften und (4) die Bruchteilsgemeinschaft. Keine Sorge, wenn du hier Probleme hattest. Es geht darum, dich zunächst einmal dafür zu sensibilisieren, welche Gesellschaftsformen es überhaupt gibt und welche Rechtsinstitutionen es noch gibt, die aber aus verschiedenen Gründen nicht als Gesellschaften angesehen werden und daher nicht dem Gesellschaftsrecht unterliegen. In den nachfolgenden Fällen werden wir noch nach und nach verschiedene Abgrenzungen - auch zwischen den Gesellschaftsformen - vornehmen.",
                  type: "text",
                },
              ],
              type: "paragraph",
            },
          ],
          type: "doc",
        },
      },
    },
    question:
      "Based on the above definition of the term and its prerequisites: Which of the following \"organizations\" constitute companies in the sense of company law. Skim the respective norms!",
  },
};

export const OrderIrrelevant: Story = {
  args: {
    ...OrderRelevant?.args,
    game: {
      ...OrderRelevant?.args?.game,
      orderRequired: false,
    },
  },
};
