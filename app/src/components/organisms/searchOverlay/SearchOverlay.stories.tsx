import { Button } from "@/components/atoms/Button/Button";
import useSearchStore from "@/stores/search.store";

import { type PropsOf } from "@emotion/react";
import { type Meta, type StoryObj } from "@storybook/react";
import { useEffect, type FunctionComponent } from "react";

import SearchOverlay from "./SearchOverlay";

const Template: FunctionComponent<PropsOf<typeof SearchOverlay>> = (args) => 
{
  const toggleDrawer = useSearchStore(s => s.toggleDrawer);

  return (
    <>
      <Button<"button"> onClick={() => toggleDrawer(true)} styleType="primary">Open</Button>
      <SearchOverlay {...args}/>
    </>
  );
};

const meta: Meta = {
  argTypes: {
    
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=780-6477&mode=dev",
    },
  },
  title: "Organisms/Search/SearchOverlay",
};

export default meta;

type Story = StoryObj<typeof SearchOverlay>;

export const Default: Story = {
  args: {
   
  },
};

