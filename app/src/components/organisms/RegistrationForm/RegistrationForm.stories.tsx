import { api } from "@/utils/api";

import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { appWithTranslation } from "next-i18next";
import { type FunctionComponent } from "react";

import { RegistrationForm } from "./RegistrationForm";

const Template: FunctionComponent = () => (
  <Box w={400}>
    <RegistrationForm/>
  </Box>
);

const meta: Meta = {
  argTypes: {},
  component: api.withTRPC(appWithTranslation(Template)),
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Lq58wHThYMiImXmLJcYbGZ/Constellatio-UI-Design?type=design&node-id=143-26667&mode=dev",
    },
  },
  title: "Organisms/RegistrationForm",
};

export default meta;

type Story = StoryObj<typeof RegistrationForm>;

export const Default: Story = {
  args: {},
};
