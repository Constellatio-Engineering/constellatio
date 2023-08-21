import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mantine/core";
import { RichtextEditorField } from "./RichtextEditorField";

const Template = (args: any) => (
  <Box w={670}>
    <RichtextEditorField {...args} />
  </Box>
);

const meta: Meta = {
  title: "Molecules/RichtextEditorField",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=906-7177&mode=dev",
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["simple", "with-legal-quote"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof RichtextEditorField>;

export const Default: Story = {
  args: {
    variant: "with-legal-quote",
    content: `<p><strong>Bold</strong></p><p><em>Italic</em></p><p><strong><em>Italic Bold</em></strong></p><p>Nomal</p><p><br><br class="ProseMirror-trailingBreak"></p><p>List:</p><ul><li><p>item</p></li><li><p>item</p></li></ul><p>Order:</p><ol><li><p>Item</p></li><li><p>Item</p></li></ol><p><br><br class="ProseMirror-trailingBreak"></p><blockquote><p>Hello world</p></blockquote>`,
  },
};
