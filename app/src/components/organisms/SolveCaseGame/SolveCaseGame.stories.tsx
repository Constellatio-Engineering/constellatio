import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import { SolveCaseGame, type SolveCaseGameProps } from "./SolveCaseGame";

const Template: FunctionComponent<SolveCaseGameProps> = args => (
  <Box w={670}>
    <SolveCaseGame {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {},
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=52-6364&mode=dev",
    },
  },
  title: "Organisms/Gamification/SolveCaseGame",
};

export default meta;

type Story = StoryObj<typeof SolveCaseGame>;

export const Default: Story = {
  args: {
    onGameStartHandler() 
    {
      console.log("onGameStartHandler");
    },
  },
};
