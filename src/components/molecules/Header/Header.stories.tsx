import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Molecules/Header",
  component: Header,
};

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  render: () => <Header />,
};

export default meta;
