import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import { Input, type InputProps } from "./Input";

const Template: FunctionComponent<InputProps> = (args) => (
  <Box w={350}>
    <Input {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {
    disabled: {
      control: "boolean",
    },
    error: {
      control: "text",
      description: "Error message",
    },
    withAsterisk: {
      control: "boolean",
    },
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=48-4837&mode=design&t=fUYGnKtkoyjTfrLF-4",
    },
  },
  title: "Atoms/SimpleInput",
};

export default meta;

type Story = StoryObj<typeof Input>;

export const TextInput: Story = {
  args: {
    description: "Your full name as it appears on your passport",
    inputType: "text",
    label: "Full name",
    placeholder: "Your name",
  },
};

export const PasswordInput: Story = {
  args: {
    inputType: "password",
    label: "Password",
    placeholder: "Password",
  },
};

// export const Error: Story = {
//   args: {
//     inputType: "text",
//     placeholder: "Your name",
//     label: "Full name",
//     description: "Your full name as it appears on your passport",
//     error: "This field is required",
//   },
// };
