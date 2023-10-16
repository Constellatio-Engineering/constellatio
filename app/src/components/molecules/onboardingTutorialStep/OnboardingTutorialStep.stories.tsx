import { Puzzle } from "@/components/Icons/Puzzle";

import { type PropsOf } from "@emotion/react";
import { Box, Popover } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import OnboardingTutorialStep from "./OnboardingTutorialStep";
import OnboardingTutorialStepItem from "./OnboardingTutorialStepItem";

const Step: FunctionComponent = () => (
  <OnboardingTutorialStep currentStep={1} totalSteps={5} stepTitle="Step Title">
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
  </OnboardingTutorialStep>
);
  
const Template: FunctionComponent<PropsOf<typeof OnboardingTutorialStep>> = () => 
{
  return (
    <Box w={700}>
      <nav style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
        <Popover
          defaultOpened
          withArrow
          position="bottom"
          styles={(theme) => ({
            arrow: {
              backgroundColor: theme.colors["neutrals-02"][1],
              border: `1px solid ${theme.colors["neutrals-02"][1]}`,
            }
          })}>
          <Popover.Target><span>Item 1</span></Popover.Target>
          <Step/>
        </Popover>
        <span>Item 2</span>
        <span>Item 3</span>
      </nav>
    </Box>
  );
};
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
    // children: (
    //   <>
    //     <OnboardingTutorialStepItem
    //       icon={<Puzzle size={20}/>}
    //       itemDescription="Get help from fellow users. Plus, there are pros who double-check the answers"
    //       itemTitle="Dictionary"
    //     />
    //     <OnboardingTutorialStepItem
    //       icon={<Puzzle size={20}/>}
    //       itemDescription="Get help from fellow users. Plus, there are pros who double-check the answers"
    //       itemTitle="Dictionary"
    //     />
    //     <OnboardingTutorialStepItem
    //       icon={<Puzzle size={20}/>}
    //       itemDescription="Get help from fellow users. Plus, there are pros who double-check the answers"
    //       itemTitle="Dictionary"
    //     />
    //   </>
    // ),
    // currentStep: 1,
    // stepTitle: "Step Title",
    // totalSteps: 5,
  },
};
