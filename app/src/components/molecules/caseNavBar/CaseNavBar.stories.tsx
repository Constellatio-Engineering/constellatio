import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import CaseNavBar, { type ICaseNavBarProps } from "./CaseNavBar";

const Template: FunctionComponent<ICaseNavBarProps> = (args) => (<CaseNavBar {...args}/>);

const meta: Meta = {
  argTypes: {
    
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/...",
    },
  },
  title: "Molecules/CaseNavBar",
};

export default meta;

type Story = StoryObj<typeof CaseNavBar>;

export const Default: Story = {
  args: {
    activeStep: 0,
    progressPercentage: 0,
    variant: "case",
  },
};
export const StepOneWithProgress: Story = {
  args: {
    activeStep: 0,
    progressPercentage: 20,
    variant: "case",
  },
};
export const StepTwo: Story = {
  args: {
    activeStep: 1,
    progressPercentage: 0,
    variant: "case",
  },
};
export const StepTwoWithProgress: Story = {
  args: {
    activeStep: 1,
    progressPercentage: 30,
    variant: "case",
  },
};

export const StepThree: Story = {
  args: {
    activeStep: 3,
    progressPercentage: 10,
    variant: "case",
  },
};

