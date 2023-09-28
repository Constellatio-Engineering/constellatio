import { type PropsOf } from "@emotion/react";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import SlidingPanelTitle from "./SlidingPanelTitle";

const Template: FunctionComponent<PropsOf<typeof SlidingPanelTitle>> = (args) => (<SlidingPanelTitle {...args}/>);

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
  title: "Molecules/SlidingPanelTitle",
};

export default meta;

type Story = StoryObj<typeof SlidingPanelTitle>;

export const Default: Story = {
  args: {
    link: {
      text: "Link Button"
    },
    number: 0,
    title: "Title",
    variant: "default"
  },
};

