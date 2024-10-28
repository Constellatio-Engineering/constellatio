import { type PropsOf } from "@emotion/react";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import ProfilePicture from "./ProfilePicture";

const Template: FunctionComponent<PropsOf<typeof ProfilePicture>> = (args) => (<ProfilePicture {...args}/>);

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
  title: "Atoms/ProfilePicture",
};

export default meta;

type Story = StoryObj<typeof ProfilePicture>;

export const Default: Story = {
  args: {
   
  },
};

