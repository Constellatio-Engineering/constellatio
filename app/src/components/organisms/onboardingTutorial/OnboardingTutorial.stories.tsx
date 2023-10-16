import { type PropsOf } from "@emotion/react";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import OnboardingTutorial from "./OnboardingTutorial";

const Template: FunctionComponent<PropsOf<typeof OnboardingTutorial>> = (args) => (<OnboardingTutorial {...args}/>);

const meta: Meta = {
  argTypes: {
    
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Lq58wHThYMiImXmLJcYbGZ/Constellatio-UI-Design?type=design&node-id=548-155076&mode=dev",
    },
  },
  title: "Organisms/OnboardingTutorial",
};

export default meta;

type Story = StoryObj<typeof OnboardingTutorial>;

export const Default: Story = {
  args: {
   
  },
};

