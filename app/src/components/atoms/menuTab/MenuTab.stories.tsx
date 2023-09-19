
import { Puzzle } from "@/components/Icons/Puzzle";

import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import MenuTab, { type IMenuTabProps } from "./MenuTab";

const Template: FunctionComponent<IMenuTabProps> = (args) => (<MenuTab {...args}/>);

const meta: Meta = {
  argTypes: {
    
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=21-422&mode=dev",
    },
  },
  title: "Atoms/MenuTab",
};

export default meta;

type Story = StoryObj<typeof MenuTab>;

export const Default: Story = {
  args: {
    disabled: false,
    title: "Menu Tab",
  },
};
export const WithIcon: Story = {
  args: {
    disabled: false,
    icon: <Puzzle/>,
    title: "Menu Tab",
  },
};

export const Active: Story = {
  args: {
    active: true,
    disabled: false,
    icon: <Puzzle/>,
    title: "Menu Tab",
  },
};
export const Disabled: Story = {
  args: {
    // active: true,
    disabled: true,
    icon: <Puzzle/>,
    title: "Menu Tab",
  },
};
