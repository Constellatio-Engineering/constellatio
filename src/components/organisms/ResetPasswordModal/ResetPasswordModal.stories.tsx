import type { Meta, StoryObj } from "@storybook/react";

import { ResetPasswordModal } from "./ResetPasswordModal";

const meta: Meta<typeof ResetPasswordModal> = {
  title: "Organisms/ResetPasswordModal",
  component: ResetPasswordModal,
};

type Story = StoryObj<typeof ResetPasswordModal>;

export const Default: Story = {
  render: () => <ResetPasswordModal />,
};

export default meta;
