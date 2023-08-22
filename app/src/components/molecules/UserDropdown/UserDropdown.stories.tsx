import type { Meta, StoryObj } from "@storybook/react";

import { UserDropdown } from "./UserDropdown";

const meta: Meta<typeof UserDropdown> = {
  component: UserDropdown,
  title: "Molecules/UserDropdown",
};

type Story = StoryObj<typeof UserDropdown>;

export const Default: Story = {
  render: () => <UserDropdown/>,
};

export default meta;
