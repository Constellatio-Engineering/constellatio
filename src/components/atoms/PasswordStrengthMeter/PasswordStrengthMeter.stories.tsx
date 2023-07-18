import { Meta, StoryObj } from "@storybook/react";
import { withDesign } from "storybook-addon-designs";
import { Box, Stack } from "@mantine/core";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import { useState } from "react";
import { Input } from "../Input/Input";
import { useDisclosure } from "@mantine/hooks";

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

const Template = (args: any) => {
  const [value, setValue] = useState("");
  const [isPasswordRevealed, { toggle }] = useDisclosure(false);

  return (
    <Box w={350}>
      <Input
        inputType="password"
        label="Your password"
        placeholder="Your password"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        onVisibilityChange={toggle}
        error={args.error}
        disabled={args.disabled}
      />
      <Stack spacing={"spacing-8"} mt={"spacing-12"}>
        {requirements.map((requirement, index) => (
          <PasswordStrengthMeter
            key={index}
            label={requirement.label}
            meets={requirement.re.test(value)}
            isPasswordRevealed={isPasswordRevealed}
            error={args.error}
            disabled={args.disabled}
          />
        ))}
      </Stack>
    </Box>
  );
};

const meta: Meta = {
  title: "Atoms/PasswordStrengthMeter",
  component: Template,
  decorators: [withDesign],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=48-4837&mode=design&t=fUYGnKtkoyjTfrLF-4",
    },
  },
  argTypes: {
    error: {
      control: "text",
      description: "Error message",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof PasswordStrengthMeter>;

export const Default: Story = {
  args: {},
};
