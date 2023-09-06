import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import ContentMenuItem, { type IContentMenuItemProps } from "./ContentMenuItem";

const Template: FunctionComponent<IContentMenuItemProps> = (args) => (<ContentMenuItem {...args}/>);

const meta: Meta = {
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=1146-20021&mode=dev",
    },
  },
  title: "Atoms/ContentMenuItem",
};

export default meta;

type Story = StoryObj<typeof ContentMenuItem>;

export const Default: Story = {
  args: {
    itemNumber: 1,
    level: 1,
    opened: false,
    title: "itemo one", 
    totalItems: 4
  },
};

