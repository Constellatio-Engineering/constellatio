import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import Label, { type ILabelProps } from "./Label";

const Template: FunctionComponent<ILabelProps> = (args) => (<Label {...args}>DICTIONARY</Label>);

const meta: Meta = {
  argTypes: {
    
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=163-4556&mode=dev",
    },
  },
  title: "Atoms/Label",
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Dictionary: Story = {
  args: {
    title: "dictionary",
    variant: "dictionary",
  },
};
export const Cases: Story = {
  args: {
    title: "case",
    variant: "case",
  },
};
export const Forum: Story = {
  args: {
    title: "forum",
    variant: "forum",
  },
};
export const Neutral: Story = {
  args: {
    title: "neutral",
    variant: "neutral",
  },
};

