import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { withDesign } from "storybook-addon-designs";
import { DownloadIcon } from "@/components/Icons/DownloadIcon";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import { Box, Flex } from "@mantine/core";

const Template = (args: any) => (
  <Flex>
    <Box w={300}>
      <Button {...args} />
    </Box>
  </Flex>
);

const meta: Meta = {
  title: "Atoms/Button",
  component: Template,
  decorators: [withDesign],
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?node-id=3%3A2&mode=dev",
    },
  },
  argTypes: {
    fullWidth: {
      control: {
        type: "boolean",
      },
    },
    size: {
      control: "select",
      options: ["large", "medium"],
    },
    styleType: {
      control: "select",
      options: ["primary", "secondarySimple", "secondarySubtle", "tertiary"],
    },
    disabled: {
      type: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button title",
    onClick: () => alert("Clicked"),
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: "Primary Button",
    leftIcon: <DownloadIcon />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: "Primary Button",
    rightIcon: <ArrowDown />,
  },
};
