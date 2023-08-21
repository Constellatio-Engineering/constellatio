import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";

import { ImageWrapperCard } from "./ImageWrapperCard";

const Template = (args: any) => (
  <Box w={670}>
    <ImageWrapperCard {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {},
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=53-5355&mode=dev",
    },
  },
  title: "Molecules/ImageWrapperCard",
};

export default meta;

type Story = StoryObj<typeof ImageWrapperCard>;

export const Default: Story = {
  args: {
    downloadable: true,
    id: "56daf83d-cfda-4fa9-adfd-96a38a8493f1",
    image: {
      author: "",
      copyright: "",
      description: "",
      dominantColor: "#c7c8c9",
      id: "5b8adbe9-11b3-4d96-94a8-2e22de45496e",
      keywords: "",
      originType: "image/png",
      src: "https://assets.caisy.io/assets/21691a6c-f949-491d-99a3-079a4bd23818/5b8adbe9-11b3-4d96-94a8-2e22de45496e/c7543241-3713-46e1-8389-0cefbb0f2bb4Rectangle5.png",
      title: "Rectangle 5",
    },
    title: "Image example below",
  },
};
