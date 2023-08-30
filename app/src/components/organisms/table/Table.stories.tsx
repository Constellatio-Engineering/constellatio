import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import Table, { type ITableProps } from "./Table";

const Template: FunctionComponent<ITableProps> = (args) => <Table {...args}/>;

const meta: Meta = {
  argTypes: {
    tableType: {
      control: "select",
      description: "Determines the type and variant of the table to display.",
      mapping: {
        "cases_all-cases": { type: "cases", variant: "all-cases" },
        cases_cases: { type: "cases", variant: "cases" },
        cases_favorites: { type: "cases", variant: "favorites" },
        cases_search: { type: "cases", variant: "search" },
        dictionary_dictionary: { type: "dictionary", variant: "dictionary" },
        dictionary_favorites: { type: "dictionary", variant: "favorites" },
        dictionary_search: { type: "dictionary", variant: "search" },
      },
      options: [
        "cases_all-cases",
        "cases_cases",
        "cases_favorites",
        "cases_search",
        "dictionary_dictionary",
        "dictionary_favorites",
        "dictionary_search",
      ],
      table: {
        category: "Table Type",
        type: { summary: "CasesTableProps | DictionaryTableProps" },
      },
      type: { name: "string", required: true },
    },
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=32-4064&mode=dev",
    },
  },
  title: "Organisms/Table/Table",
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    tableType: { type: "cases", variant: "all-cases" },
  },
};
