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
    button: {
      content: "Explore Civil law cases",
      onClick: () => {},
    },
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit",
    title: "Title",
    variant: "For-large-areas"
  },
};
export const InSmallArea: Story = {
  args: {
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit",
    title: "Title",
    variant: "For-small-areas"
  },
};
export const SmallAreaHiddenIcon: Story = {
  args: {
    hideIcon: true,
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit",
    title: "Title",
    variant: "For-small-areas"
  },
};

