import { type PropsOf } from "@emotion/react";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import Search from "./Search";

const Template: FunctionComponent<PropsOf<typeof Search>> = (args) => (<Search {...args}/>);

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
  title: "Organisms/Search",
};

export default meta;

type Story = StoryObj<typeof Search>;

export const Default: Story = {
  args: {
   
  },
};

