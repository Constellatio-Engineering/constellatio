import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import EmptyStateCard, { type IEmptyStateCardProps } from "./EmptyStateCard";

const Template: FunctionComponent<IEmptyStateCardProps> = (args) => (<EmptyStateCard {...args}/>);

const meta: Meta = {
  argTypes: {
    
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=1176-28280&mode=dev",
    },
  },
  title: "Organisms/EmptyStateCard",
};

export default meta;

type Story = StoryObj<typeof EmptyStateCard>;

export const InLargeArea: Story = {
  args: {
    isFiltered: false,
    variant: "For-large-areas"
  },
};
export const InLargeAreaFiltered: Story = {
  args: {
    isFiltered: true,
    variant: "For-large-areas"
  },
};
export const InSmallArea: Story = {
  args: {
    isFiltered: false,
    variant: "For-small-areas"
  },
};
export const InSmallAreaFiltered: Story = {
  args: {
    isFiltered: true,
    variant: "For-small-areas"
  },
};

