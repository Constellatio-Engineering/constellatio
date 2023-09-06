import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import OverviewHeader, { type ICasesOverviewHeaderProps } from "./CasesOverviewHeader";

const Template: FunctionComponent<ICasesOverviewHeaderProps> = (args) => (<OverviewHeader {...args}/>);

const meta: Meta = {
  argTypes: {
    
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=49-2862&mode=dev",
    },
  },
  title: "Organisms/OverviewHeader",
};

export default meta;

type Story = StoryObj<typeof OverviewHeader>;

export const Case: Story = {
  args: {
    // __typename: "PageHeader",
    categories: [],
    title: "Cases",
    variant: "case"
  },
};

export const Dictionary: Story = {
  args: {
    // __typename: "PageHeader",
    categories: [],
    title: "Dictionary",
    variant: "dictionary"
  },
};

