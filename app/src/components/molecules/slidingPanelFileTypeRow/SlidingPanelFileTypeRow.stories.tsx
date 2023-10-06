import { type PropsOf } from "@emotion/react";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import SlidingPanelFileTypeRow from "./SlidingPanelFileTypeRow";

const Template: FunctionComponent<PropsOf<typeof SlidingPanelFileTypeRow>> = (args) => (<SlidingPanelFileTypeRow {...args}/>);

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
  title: "Atoms/SlidingPanelFileTypeRow",
};

export default meta;

type Story = StoryObj<typeof SlidingPanelFileTypeRow>;

export const Default: Story = {
  args: {
    fileExtention: "pdf",
    title: "Title"
  },
};

