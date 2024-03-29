import { Container } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import { AuthPage, type AuthPageProps } from "./AuthPage";

const Template: FunctionComponent<AuthPageProps> = args => (
  <Container maw={1440} p={0}>
    <AuthPage {...args}/>
  </Container>
);

const meta: Meta = {
  argTypes: {
    tab: {
      control: "select",
      options: ["login", "register"],
    },
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Lq58wHThYMiImXmLJcYbGZ/Constellatio-UI-Design?type=design&node-id=133-25178&mode=dev",
    },
  },
  title: "Pages/AuthPage",
};

export default meta;

type Story = StoryObj<typeof AuthPage>;

export const Default: Story = {
  args: {
    tab: "login",
  },
};
