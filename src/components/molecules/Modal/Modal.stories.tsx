import { Meta, StoryObj } from "@storybook/react";
import { Box, Group, Stack, Text, Title } from "@mantine/core";
import { Modal } from "./Modal";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "@/components/atoms/Button/Button";

const Template = (args: any) => {
  const [isOpened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={isOpened}
        centered
        onClose={() => {
          console.log("Closed");
          close();
        }}
        {...args}
      >
        <Text>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
          velit mollit.
        </Text>
        <Group noWrap grow w="100%">
          <Button onClick={close} fullWidth styleType="secondarySimple">
            Close Modal
          </Button>
          <Button styleType="primary" fullWidth>
            Primary Button
          </Button>
        </Group>
      </Modal>
      <Button onClick={open} title="Open Modal" type="button" styleType="primary">
        Open Modal
      </Button>
    </>
  );
};

const meta: Meta = {
  title: "Molecules/Modal",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=168-4891&mode=dev",
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    opened: true,
    title: "Title",
  },
};
