import type { Meta, StoryObj } from "@storybook/react";

import { LoginForm } from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
  title: "Organisms/UpdatePasswordForm",
  component: LoginForm,
};

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  render: () => <LoginForm />,
};

export default meta;
