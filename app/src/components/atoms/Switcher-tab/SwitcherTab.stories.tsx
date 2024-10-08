import { Puzzle } from "@/components/Icons/Puzzle";
import { colooors } from "@/constants/styles/colors";
import { spaciiing } from "@/constants/styles/spacing";
import { type ExtractProps } from "@/utils/types";

import { Tabs } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import { SwitcherTab } from "./SwitcherTab";

const Template: FunctionComponent<ExtractProps<typeof SwitcherTab>> = args => (
  <Tabs
    unstyled
    styles={(theme) => ({
      root: {},
      tab: {
        ":active": {
          backgroundColor: colooors["neutrals-01"][2],
        },
        ":focus": {
          backgroundColor: colooors["neutrals-01"][1],
        },
        ":hover": {
          backgroundColor: colooors["neutrals-01"][1],
        },
        alignItems: "center",
        backgroundColor: "transparent",
        border: "none",
        borderRadius: theme.radius["radius-20"],
        color: colooors["neutrals-02"][1],
        cursor: "pointer",
        display: "flex",
        fontFamily: "inherit",
        fontSize: "16px",
        fontWeight: 500,
        gap: spaciiing["spacing-4"],
        lineHeight: "24px",
        outline: "none",
        padding: `${spaciiing["spacing-8"]} ${spaciiing["spacing-16"]}`,
        transition: "all 0.3s ease",
      },
      tabIcon: {
        alignItems: "center",
        display: "flex",
      },
    })}>
    <Tabs.List>
      <SwitcherTab {...args}/>
    </Tabs.List>
  </Tabs>
);

const meta: Meta = {
  argTypes: {},
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=23-438&mode=dev",
    },
  },
  title: "Atoms/SwitcherTab",
};

export default meta;

type Story = StoryObj<typeof SwitcherTab>;

export const Default: Story = {
  args: { children: "Anmelden", value: "login" },
};

export const WithIcon: Story = {
  args: { children: "Anmelden", icon: <Puzzle/>, value: "login" },
};
