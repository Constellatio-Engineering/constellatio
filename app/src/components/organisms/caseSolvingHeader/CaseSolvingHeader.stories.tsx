import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import CaseSolvingHeader, {
  type ICaseSolvingHeaderProps,
} from "./CaseSolvingHeader";

const Template: FunctionComponent<ICaseSolvingHeaderProps> = (args) => (
  <CaseSolvingHeader {...args}/>
);

const meta: Meta = {
  argTypes: {},
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=260-5054&mode=dev",
    },
  },
  title: "Organisms/CaseSolvingHeader",
};

export default meta;

type Story = StoryObj<typeof CaseSolvingHeader>;

export const Case: Story = {
  args: {
    pathSlugs: ["bread crumb", "bread crumb", "bread crumb"],
    title: "GesellschaftsR 3 | Die schiefe Markise",
    variant: "case",
  }
};

export const Dictionay: Story = {
  args: {
    pathSlugs: ["bread crumb", "bread crumb", "bread crumb"],
    title: "GesellschaftsR 3 Die schiefe Markise",
    variant: "dictionary",
  }
};
