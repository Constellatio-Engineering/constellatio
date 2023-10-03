import { type PropsOf } from "@emotion/react";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import CutomAlertCard from "./CutomAlertCard";

const Template: FunctionComponent<PropsOf<typeof CutomAlertCard>> = (args) => (<CutomAlertCard {...args}/>);

const meta: Meta = {
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/...",
    },
  },
  title: "Molecules/CutomAlertCard",
};

export default meta;

type Story = StoryObj<typeof CutomAlertCard>;

export const Error: Story = {
  args: {
    message: "This is a message",
    variant: "error",
  },
};
export const Success: Story = {
  args: {
    message: "This is a message",
    variant: "success",
  },
};

