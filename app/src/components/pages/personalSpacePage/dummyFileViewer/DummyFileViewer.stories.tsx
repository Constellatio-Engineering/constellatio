import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import DummyFileViewer, { type IDummyFileViewerProps } from "./DummyFileViewer";

const Template: FunctionComponent<IDummyFileViewerProps> = (args) => (<DummyFileViewer {...args}/>);

const meta: Meta = {
  argTypes: {
    
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/...",
    },
  },
  title: "Atoms/DummyFileViewer",
};

export default meta;

type Story = StoryObj<typeof DummyFileViewer>;

export const Default: Story = {
  args: {
   
  },
};

