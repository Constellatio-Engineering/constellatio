import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import SearchFieldSmall from "./SearchFieldSmall";

const Template: FunctionComponent = (args) => (<SearchFieldSmall {...args}/>);

const meta: Meta = {
  argTypes: {
    
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=35-5334&mode=dev",
    },
  },
  title: "Molecules/SearchFieldSmall",
};

export default meta;

type Story = StoryObj<typeof SearchFieldSmall>;

export const Default: Story = {
  args: {
   
  },
};

