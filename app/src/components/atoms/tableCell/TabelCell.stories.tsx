import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";

import TableCell from "./TabelCell";

const Template = (): JSX.Element => (
  <Box w={350}>
    <TableCell/>
  </Box>
);

const meta: Meta = {
  argTypes: {
    
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=32-951&mode=dev",
    },
  },
  title: "Atoms/TableCell",
};

export default meta;

type Story = StoryObj<typeof TableCell>;

export const Default: Story = {
  args: {
   
  },
};

