import { type PropsOf } from "@emotion/react";
import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import SearchBar from "./SearchBar";

const Template: FunctionComponent<PropsOf<typeof SearchBar>> = (args) => (<Box w={1440}><SearchBar {...args}/></Box>);

const meta: Meta = {
  argTypes: {
    
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=754-17809&mode=dev",
    },
  },
  title: "Molecules/Search/SearchBar",
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
   
  },
};

