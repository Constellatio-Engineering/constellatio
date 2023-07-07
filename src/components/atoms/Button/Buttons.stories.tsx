import { Meta, StoryObj } from "@storybook/react";
import { Button as MantineButton } from "./Button";
import { withDesign } from "storybook-addon-designs";
import { DownloadIcon } from "@/components/Icons/DownloadIcon";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import { Box, Flex } from "@mantine/core";

const Template = (args: any) => (
  <Flex>
    <Box w={300}>
      <MantineButton {...args} />
    </Box>
  </Flex>
);

const meta: Meta = {
  title: "Atoms/Button",
  component: Template,
  decorators: [withDesign],
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

type Story = StoryObj<typeof MantineButton>;

export const Primary: Story = {
  args: {
    title: "Button title",
    onClick: () => alert("Clicked"),
  },
};

export const WithLeftIcon: Story = {
  args: {
    title: "Primary Button",
    leftIcon: <DownloadIcon />,
  },
};

export const WithRightIcon: Story = {
  args: {
    title: "Primary Button",
    rightIcon: <ArrowDown />,
  },
};
