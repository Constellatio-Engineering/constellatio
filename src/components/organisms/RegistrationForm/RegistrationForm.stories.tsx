import type { Meta, StoryObj } from "@storybook/react";

import { RegistrationForm } from "./RegistrationForm";

const meta: Meta<typeof RegistrationForm> = {
  title: "Organisms/RegistrationForm",
  component: RegistrationForm,
};

type Story = StoryObj<typeof RegistrationForm>;

export const Default: Story = {
  render: () => <RegistrationForm />,
};

export default meta;
