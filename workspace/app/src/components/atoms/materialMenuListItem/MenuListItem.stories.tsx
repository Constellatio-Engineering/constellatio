import { FileIcon } from "@/components/Icons/FileIcon";

import { type PropsOf } from "@emotion/react";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import MaterialsMenuListItem from "./MaterialsMenuListItem";

const Template: FunctionComponent<PropsOf<typeof MaterialsMenuListItem>> = (args) => (<MaterialsMenuListItem {...args}/>);

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
  title: "Organisms/MenuListItem",
};

export default meta;

type Story = StoryObj<typeof MaterialsMenuListItem>;

export const Default: Story = {
  args: {
    icon: <FileIcon/>,
    title: "title"
  },
};

