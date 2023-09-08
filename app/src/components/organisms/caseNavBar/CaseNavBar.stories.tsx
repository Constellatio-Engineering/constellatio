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
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=155-4420&mode=dev",
    },
  },
  title: "Molecules/CaseNavBar",
};

export default meta;

type Story = StoryObj<typeof CaseNavBar>;

export const Default: Story = {
  args: {
    activeStep: 0,
    variant: "case",
  },
};
export const StepOneWithProgress: Story = {
  args: {
    activeStep: 0,
    variant: "case",
  },
};
export const StepTwo: Story = {
  args: {
    activeStep: 1,
    variant: "case",
  },
};
export const StepTwoWithProgress: Story = {
  args: {
    activeStep: 1,
    variant: "case",
  },
};

export const StepThree: Story = {
  args: {
    activeStep: 2,
    variant: "case",
  },
};

