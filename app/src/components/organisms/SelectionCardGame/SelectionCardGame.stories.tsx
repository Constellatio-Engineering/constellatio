import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import { SelectionCardGame, type SelectionCardGameProps } from "./SelectionCardGame";

const Template: FunctionComponent = (args: SelectionCardGameProps) => (
  <Box w={670}>
    <SelectionCardGame {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {},
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=51-9026&mode=dev",
    },
  },
  title: "Organisms/Gamification/SelectionCardGame",
};

export default meta;

type Story = StoryObj<typeof SelectionCardGame>;

export const Default: Story = {
  args: {
    game: {
      options: [
        {
          correctAnswer: false,
          id: "mantine-jv39t5jcd",
          label: "Incorrect 1",
        },
        {
          correctAnswer: false,
          id: "mantine-kq6liayyc",
          label: "Incorrect 2",
        },
        {
          correctAnswer: false,
          id: "mantine-j5w8k2a9v",
          label: "Incorrect 3",
        },
        {
          correctAnswer: true,
          id: "mantine-pygn9ailp",
          label: "Correct 1",
        },
        {
          correctAnswer: true,
          id: "mantine-4x0lkbhlu",
          label: "Correct 2",
        },
        {
          correctAnswer: true,
          id: "mantine-7qis9b9wa",
          label: "Correct 3",
        },
      ],
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
      "So far so easy. But what exactly does the wording \"liabilities established up until then\" in § 160 HGB mean?",
  },
};
