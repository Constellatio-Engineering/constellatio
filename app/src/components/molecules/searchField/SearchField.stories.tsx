import { type PropsOf } from "@emotion/react";
import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import SearchField from "./SearchField";

const Template: FunctionComponent<PropsOf<typeof SearchField>> = (
  args
) => (
  <Box w={300}>
    <SearchField {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {
    size: {
      control: "radio",
      options: ["small", "normal"],
    },
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=35-5334&mode=dev",
    },
  },
  title: "Molecules/Search/SearchField",
};

export default meta;

type Story = StoryObj<typeof SearchField>;

export const Default: Story = {
  args: {},
};
