/* eslint-disable max-lines */
import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import { Callout, type CalloutProps } from "./Callout";

const Template: FunctionComponent<CalloutProps> = (args) => (
  <Box w={670}>
    <Callout {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {
    calloutType: {
      control: "select",
      options: ["remember", "bestPractice", "definition", "quote", "lawReference", "specialProblem", "example"],
    }
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=107-3775&mode=dev",
    },
  },
  title: "Organisms/Callout",
};

export default meta;

type Story = StoryObj<typeof Callout>;

export const Expandable: Story = {
  args: {
    calloutType: "remember",
    expandable: true,
    id: "33028fe1-b1b1-465d-b936-4be217c44652",
    text: {
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
};

export const Fixed: Story = {
  args: {
    ...Expandable.args,
    expandable: false,
  },
};
