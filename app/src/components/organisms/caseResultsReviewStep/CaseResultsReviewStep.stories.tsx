import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import CaseResultsReviewStep, { type ICaseResultsReviewStepProps } from "./CaseResultsReviewStep";

const Template: FunctionComponent<ICaseResultsReviewStepProps> = (args) => (<CaseResultsReviewStep {...args}/>);

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
  title: "Atoms/CaseResultsReviewStep",
};

export default meta;

type Story = StoryObj<typeof CaseResultsReviewStep>;

export const Default: Story = {
  args: {
   
  },
};

