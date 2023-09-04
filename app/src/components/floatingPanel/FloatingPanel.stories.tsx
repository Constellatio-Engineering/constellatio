import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import FloatingPanel, { type IFloatingPanelProps } from "./FloatingPanel";
import { Trash } from "../Icons/Trash";

const Template: FunctionComponent<IFloatingPanelProps> = (args) => (<FloatingPanel {...args}/>);

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
  title: "Organisms/FloatingPanel",
};

export default meta;

type Story = StoryObj<typeof FloatingPanel>;

export const Default: Story = {
  args: {
    content: "Data",
    tabs: [{ icon: { src: <Trash/> }, title: "Content" }, { icon: { src: <Trash/> }, title: "Facts" }]
  },
};

