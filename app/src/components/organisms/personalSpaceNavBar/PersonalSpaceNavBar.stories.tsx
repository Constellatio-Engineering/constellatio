import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import PersonalSpaceNavBar, { type PersonalSpaceNavBarProps } from "./PersonalSpaceNavBar";

const Template: FunctionComponent<PersonalSpaceNavBarProps> = (args) => (<PersonalSpaceNavBar {...args}/>);

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
  title: "Atoms/PersonalSpaceNavBar",
};

export default meta;

type Story = StoryObj<typeof PersonalSpaceNavBar>;

export const Default: Story = {
  args: {
   
  },
};

