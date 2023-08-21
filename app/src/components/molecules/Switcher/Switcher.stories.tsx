import { SwitcherTab } from "@/components/atoms/Switcher-tab/SwitcherTab";
import { Puzzle } from "@/components/Icons/Puzzle";

import { Box, Flex, Tabs } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";

import { Switcher } from "./Switcher";

const Template = (args: any) => (
  <Box w={args.w ?? "fit-content"}>
    <Flex>
      <Switcher defaultValue="value2" {...args}/>
    </Flex>
  </Box>
);

const meta: Meta = {
  argTypes: {
    size: {
      control: "select",
      options: ["big", "medium"],
    },
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=23-438&mode=dev",
    },
  },
  title: "Molecules/Switcher",
};

export default meta;

type Story = StoryObj<typeof Switcher>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Tabs.List>
          <SwitcherTab value="login">Switcher tab 1</SwitcherTab>
          <SwitcherTab value="value2">Switcher tab 2</SwitcherTab>
          <SwitcherTab value="value3">Switcher tab 3</SwitcherTab>
          <SwitcherTab value="value4">Switcher tab 4</SwitcherTab>
        </Tabs.List>
        <Tabs.Panel value="login">Login</Tabs.Panel>
      </>
    ),
  },
};

export const Login: Story = {
  args: {
    children: (
      <>
        <Tabs.List>
          <SwitcherTab value="value2">Login</SwitcherTab>
          <SwitcherTab value="register">Register</SwitcherTab>
        </Tabs.List>
      </>
    ),
    tabStyleOverwrite: {
      width: "49.5%",
    },
    w: 500
  },
};

export const WithIcons: Story = {
  args: {
    children: (
      <>
        <Tabs.List>
          <SwitcherTab value="login" icon={<Puzzle/>}>
            Switcher tab 1
          </SwitcherTab>
          <SwitcherTab value="value2" icon={<Puzzle/>}>
            Switcher tab 2
          </SwitcherTab>
          <SwitcherTab value="value3" icon={<Puzzle/>}>
            Switcher tab 3
          </SwitcherTab>
          <SwitcherTab value="value4" icon={<Puzzle/>}>
            Switcher tab 4
          </SwitcherTab>
        </Tabs.List>
        <Tabs.Panel value="login">Login</Tabs.Panel>
      </>
    ),
  },
};
