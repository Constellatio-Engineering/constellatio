/* eslint-disable max-lines */
import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import { Richtext, type RichtextProps } from "./Richtext";

const Template: FunctionComponent<RichtextProps> = args => (
  <Box w={500}>
    <Richtext {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {},
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Lq58wHThYMiImXmLJcYbGZ/Constellatio-UI-Design?type=design&node-id=45-13163&mode=dev",
    },
  },
  title: "Molecules/Richtext",
};

export default meta;

type Story = StoryObj<typeof Richtext>;

export const Default: Story = {
  args: {
    data: {
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
  }
};
