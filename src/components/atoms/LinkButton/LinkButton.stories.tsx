import { Meta, StoryObj } from "@storybook/react";
import { withDesign } from "storybook-addon-designs";
import { LinkButton } from "./LinkButton";
import { DownloadIcon } from "@/components/Icons/DownloadIcon";

const Template = (args: any) => <LinkButton {...args} />;

const meta: Meta = {
  title: "Atoms/LinkButton",
  component: Template,
  decorators: [withDesign],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=10-205&mode=dev",
    },
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["big", "medium"],
    },
    disabled: {
      control: "boolean",
    }
  },
};

export default meta;

type Story = StoryObj<typeof LinkButton>;

export const Default: Story = {
  args: {
    icon: <DownloadIcon />,
    title: "Link button",
    size: "big",
    
  },
};
