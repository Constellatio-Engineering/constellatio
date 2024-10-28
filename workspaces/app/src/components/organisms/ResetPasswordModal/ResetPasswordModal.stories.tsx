import { Button } from "@/components/atoms/Button/Button";

import { type Meta, type StoryObj } from "@storybook/react";
import { useAtom } from "jotai";
import { type FunctionComponent } from "react";

import { ResetPasswordModal, resetPasswordModalVisible } from "./ResetPasswordModal";

const Template: FunctionComponent = () =>
{
  const [, setResetPasswordModalOpen] = useAtom(resetPasswordModalVisible);
  const openResetPasswordModal = (): void => setResetPasswordModalOpen(true);

  return (
    <>
      <ResetPasswordModal/>
      <Button<"button"> onClick={openResetPasswordModal} styleType="primary">
        Open Modal
      </Button>
    </>
  );
};

const meta: Meta = {
  argTypes: {},
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Lq58wHThYMiImXmLJcYbGZ/Constellatio-UI-Design?type=design&node-id=273-68492&mode=dev",
    },
  },
  title: "Organisms/ResetPasswordModal",
};

export default meta;

type Story = StoryObj<typeof ResetPasswordModal>;

export const Default: Story = {
  args: {},
};
