import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mantine/core";
import { Callout } from "./Callout";

const Template = (args: any) => (
  <Box w={670}>
    <Callout {...args} />
  </Box>
);

const meta: Meta = {
  title: "Organisms/Callout",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=107-3775&mode=dev",
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Callout>;

export const Expandable: Story = {
  args: {
    icon: {
      author: "",
      copyright: "",
      description: "",
      dominantColor: "#000000",
      id: "73368b0a-3ea1-4774-9b0e-d126cbfaeee1",
      keywords: "",
      originType: "image/svg+xml",
      src: "https://assets.caisy.io/assets/21691a6c-f949-491d-99a3-079a4bd23818/73368b0a-3ea1-4774-9b0e-d126cbfaeee1/6308ce14-eec9-4794-b8af-98b29a2acadbbookbookmark.svg",
      title: "book-bookmark",
    },
    id: "33028fe1-b1b1-465d-b936-4be217c44652",
    text: {
      id: "e1cabad6-1b5a-43b8-9117-92509f724a98",
      richTextContent: {
        connections: [],
        json: {
          content: [
            {
              attrs: {
                level: 2,
                textAlign: "left",
              },
              content: [
                {
                  text: "A. Introduction to corporate la h2",
                  type: "text",
                },
              ],
              type: "heading",
            },
            {
              attrs: {
                textAlign: "left",
              },
              content: [
                {
                  text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. bold",
                  type: "text",
                },
              ],
              type: "paragraph",
            },
            {
              attrs: {
                textAlign: "left",
              },
              type: "paragraph",
            },
            {
              attrs: {
                textAlign: "left",
              },
              content: [
                {
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. bold",
                  type: "text",
                },
                {
                  type: "hardBreak",
                },
              ],
              type: "paragraph",
            },
            {
              attrs: {
                level: 3,
                textAlign: "left",
              },
              content: [
                {
                  text: "Introduction to corporate law h3",
                  type: "text",
                },
              ],
              type: "heading",
            },
            {
              attrs: {
                level: 4,
                textAlign: "left",
              },
              content: [
                {
                  text: "Introduction to corporate law h4",
                  type: "text",
                },
              ],
              type: "heading",
            },
            {
              attrs: {
                level: 5,
                textAlign: "left",
              },
              content: [
                {
                  text: "Introduction to corporate law h5",
                  type: "text",
                },
              ],
              type: "heading",
            },
            {
              attrs: {
                level: 5,
                textAlign: "left",
              },
              content: [
                {
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "Introduction to corporate law h5",
                  type: "text",
                },
              ],
              type: "heading",
            },
            {
              attrs: {
                textAlign: "left",
              },
              content: [
                {
                  content: [
                    {
                      attrs: {
                        textAlign: "left",
                      },
                      content: [
                        {
                          text: "Bullet list example A",
                          type: "text",
                        },
                      ],
                      type: "paragraph",
                    },
                  ],
                  type: "listItem",
                },
                {
                  content: [
                    {
                      attrs: {
                        textAlign: "left",
                      },
                      content: [
                        {
                          text: "Bullet list example B",
                          type: "text",
                        },
                      ],
                      type: "paragraph",
                    },
                  ],
                  type: "listItem",
                },
                {
                  content: [
                    {
                      attrs: {
                        textAlign: "left",
                      },
                      content: [
                        {
                          text: "Bullet list example C",
                          type: "text",
                        },
                      ],
                      type: "paragraph",
                    },
                  ],
                  type: "listItem",
                },
                {
                  content: [
                    {
                      attrs: {
                        textAlign: "left",
                      },
                      content: [
                        {
                          text: "Bullet list example D",
                          type: "text",
                        },
                      ],
                      type: "paragraph",
                    },
                  ],
                  type: "listItem",
                },
              ],
              type: "bulletList",
            },
            {
              attrs: {
                textAlign: "left",
              },
              type: "paragraph",
            },
            {
              attrs: {
                start: 1,
                textAlign: "left",
              },
              content: [
                {
                  content: [
                    {
                      attrs: {
                        textAlign: "left",
                      },
                      content: [
                        {
                          text: "Bullet list example A",
                          type: "text",
                        },
                      ],
                      type: "paragraph",
                    },
                  ],
                  type: "listItem",
                },
                {
                  content: [
                    {
                      attrs: {
                        textAlign: "left",
                      },
                      content: [
                        {
                          text: "Bullet list example B",
                          type: "text",
                        },
                      ],
                      type: "paragraph",
                    },
                  ],
                  type: "listItem",
                },
                {
                  content: [
                    {
                      attrs: {
                        textAlign: "left",
                      },
                      content: [
                        {
                          text: "Bullet list example C",
                          type: "text",
                        },
                      ],
                      type: "paragraph",
                    },
                  ],
                  type: "listItem",
                },
                {
                  content: [
                    {
                      attrs: {
                        textAlign: "left",
                      },
                      content: [
                        {
                          text: "Bullet list example D",
                          type: "text",
                        },
                      ],
                      type: "paragraph",
                    },
                  ],
                  type: "listItem",
                },
              ],
              type: "orderedList",
            },
            {
              attrs: {
                textAlign: "left",
              },
              type: "paragraph",
            },
            {
              attrs: {
                textAlign: "left",
              },
              content: [
                {
                  marks: [
                    {
                      attrs: {
                        class: null,
                        href: "www.test.com",
                        target: "_self",
                      },
                      type: "link",
                    },
                  ],
                  text: "testasdasdasdasd",
                  type: "text",
                },
              ],
              type: "paragraph",
            },
            {
              attrs: {
                textAlign: "left",
              },
              content: [
                {
                  marks: [
                    {
                      attrs: {
                        class: null,
                        href: "www.test.com",
                        target: "_self",
                      },
                      type: "link",
                    },
                    {
                      type: "bold",
                    },
                  ],
                  text: "testasdasdasdasd",
                  type: "text",
                },
              ],
              type: "paragraph",
            },
          ],
          type: "doc",
        },
      },
    },

    title: "Law reference",
    expandable: true,
  },
};

export const Fixed: Story = {
  args: {
    ...Expandable.args,
    expandable: false,
  },
};
