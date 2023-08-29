import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import OverviewCard, { type IOverviewCard } from "./OverviewCard";

const Template: FunctionComponent<IOverviewCard> = (args) => (<OverviewCard {...args}/>);

const meta: Meta = {
  argTypes: {
    variant: {
      control: {
        options: ["case", "dictionary"],
        type: "radio",
      }
    }
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=1146-19728&mode=dev",
    },
  },
  title: "Organisms/OverviewCard",
};

export default meta;

type Story = StoryObj<typeof OverviewCard>;

export const Case: Story = {
  args: {
    lastUpdated: new Date(),
    legalArea: "Labor law",
    status: "inProgress",
    tags: ["Labor law", "Civil law", "Internal relationship of partnerships"],
    timeInMinutes: 120,
    topic: "Basic of labor law",
    variant: "case",
    views: 32,
  },
};
export const Dictionary: Story = {
  args: {
    lastUpdated: new Date(),
    legalArea: "Labor law",
    tags: ["Labor law", "Civil law", "Internal relationship of partnerships"],
    timeInMinutes: 120,
    topic: "Basic of labor law",
    variant: "dictionary",
    views: 32,
  },
};

