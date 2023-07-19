import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mantine/core";
import { ResetPasswordModal, resetPasswordModalVisible } from "./ResetPasswordModal";
import { Button } from "@/components/atoms/Button/Button";
import { useAtom } from "jotai";

const Template = (args: any) => {
  const [_, setResetPasswordModalOpen] = useAtom(resetPasswordModalVisible);
  const openResetPasswordModal = () => setResetPasswordModalOpen(true);
  return (
    <>
      <ResetPasswordModal {...args} />
      <Button onClick={openResetPasswordModal} styleType="primary">
        Open Modal
      </Button>
    </>
  );
};

const meta: Meta = {
  title: "Organisms/ResetPasswordModal",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Lq58wHThYMiImXmLJcYbGZ/Constellatio-UI-Design?type=design&node-id=273-68492&mode=dev",
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ResetPasswordModal>;

export const Default: Story = {
  args: {},
};
