import { Puzzle } from "@/components/Icons/Puzzle";

import { type PropsOf } from "@emotion/react";
import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import OnboardingTutorialStep from "./OnboardingTutorialStep";
import OnboardingTutorialStepItem from "./OnboardingTutorialStepItem";

const Template: FunctionComponent<PropsOf<typeof OnboardingTutorialStep>> = (
  args
) => <Box w={430}><OnboardingTutorialStep {...args}/></Box>;

const meta: Meta = {
  argTypes: {},
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=819-23324&mode=dev",
    },
  },
  title: "Molecules/OnboardingTutorialStep",
};

export default meta;

type Story = StoryObj<typeof OnboardingTutorialStep>;

export const Default: Story = {
  args: {
    children: (
      <>
        <OnboardingTutorialStepItem
          icon={<Puzzle size={20}/>}
          itemDescription="Get help from fellow users. Plus, there are pros who double-check the answers"
          itemTitle="Dictionary"
        />
        <OnboardingTutorialStepItem
          icon={<Puzzle size={20}/>}
          itemDescription="Get help from fellow users. Plus, there are pros who double-check the answers"
          itemTitle="Dictionary"
        />
        <OnboardingTutorialStepItem
          icon={<Puzzle size={20}/>}
          itemDescription="Get help from fellow users. Plus, there are pros who double-check the answers"
          itemTitle="Dictionary"
        />
      </>
    ),
    currentStep: 1,
    stepTitle: "Step Title",
    totalSteps: 5,
  },
};
