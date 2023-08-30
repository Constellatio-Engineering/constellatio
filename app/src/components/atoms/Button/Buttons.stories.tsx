import { ArrowDown } from "@/components/Icons/ArrowDown";
import { DownloadIcon } from "@/components/Icons/DownloadIcon";
import { type ExtractProps } from "@/utils/types";

import { Box, Flex } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import { Button } from "./Button";

const Template: FunctionComponent<ExtractProps<typeof Button>> = args => (
  <Flex>
    <Box w={300}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore - This is needed because the Type produced by the Button component is too complex for Typescript*/}
      <Button {...args}/>
    </Box>
  </Flex>
);

const meta: Meta = {
  argTypes: {
    disabled: {
      type: "boolean",
    },
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
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?node-id=3%3A2&mode=dev",
    },
  },
  tags: ["autodocs"],
  title: "Atoms/Button",
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
    leftIcon: <DownloadIcon/>,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: "Primary Button",
    rightIcon: <ArrowDown/>,
  },
};
