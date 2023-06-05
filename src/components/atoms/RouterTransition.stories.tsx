import type { Meta, StoryObj } from "@storybook/react";

import { RouterTransition } from "./RouterTransition";

const meta: Meta<typeof RouterTransition> = {
  title: "Atoms/RouterTransition",
  component: RouterTransition,
};

type Story = StoryObj<typeof RouterTransition>;

export const Default: Story = {
  render: () => <RouterTransition />,
};

export default meta;
