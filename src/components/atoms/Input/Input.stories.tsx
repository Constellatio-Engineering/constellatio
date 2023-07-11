import { Meta, StoryObj } from "@storybook/react";
import { withDesign } from "storybook-addon-designs";
import { Input } from "./Input";
import { Box } from "@mantine/core";

const Template = (args: any) => (
  <Box w={350}>
    <Input {...args} />
  </Box>
);

const meta: Meta = {
  title: "Atoms/SimpleInput",
  component: Template,
  decorators: [withDesign],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=48-4837&mode=design&t=fUYGnKtkoyjTfrLF-4",
    },
  },
  argTypes: {
    withAsterisk: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    error: {
      control: "text",
      description: "Error message",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const TextInput: Story = {
  args: {
    inputType: "text",
    placeholder: "Your name",
    label: "Full name",
    description: "Your full name as it appears on your passport",
  },
};

export const PasswordInput: Story = {
  args: {
    inputType: "password",
    placeholder: "Password",
    label: "Password",
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
