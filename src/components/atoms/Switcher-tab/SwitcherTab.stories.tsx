import { Meta, StoryObj } from "@storybook/react";
import { withDesign } from "storybook-addon-designs";
import { Tabs } from "@mantine/core";
import { SwitcherTab } from "./SwitcherTab";
import { Puzzle } from "@/components/Icons/Puzzle";

const Template = (args: any) => (
  <Tabs
    unstyled
    styles={(theme) => ({
      root: {},
      tab: {
        padding: `${theme.spacing["spacing-8"]} ${theme.spacing["spacing-16"]}`,
        borderRadius: theme.radius["radius-20"],
        border: "none",
        outline: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: theme.spacing["spacing-4"],
        backgroundColor: "transparent",
        fontSize: "16px",
        fontWeight: 500,
        lineHeight: "24px",
        fontFamily: "inherit",
        color: theme.colors["neutrals-02"][1],
        transition: "all 0.3s ease",

        ":hover": {
          backgroundColor: theme.colors["neutrals-01"][1],
        },

        ":active": {
          backgroundColor: theme.colors["neutrals-01"][2],
        },

        ":focus": {
          backgroundColor: theme.colors["neutrals-01"][1],
        },
      },
      tabIcon: {
        display: "flex",
        alignItems: "center",
      },
    })}
  >
    <Tabs.List>
      <SwitcherTab {...args} />
    </Tabs.List>
  </Tabs>
);

const meta: Meta = {
  title: "Atoms/SwitcherTab",
  component: Template,
  decorators: [withDesign],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=23-438&mode=dev",
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof SwitcherTab>;

export const Default: Story = {
  args: { value: "login", children: "Anmelden" },
};

export const WithIcon: Story = {
  args: { value: "login", children: "Anmelden", icon: <Puzzle /> },
};
