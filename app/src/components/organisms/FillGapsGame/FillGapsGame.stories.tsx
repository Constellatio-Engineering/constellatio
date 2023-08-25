import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FC } from "react";

import { FillGapsGame, type TFillGapsGame } from "./FillGapsGame";

const Template: FC<TFillGapsGame> = (args) => (
  <Box w={670}>
    <FillGapsGame {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {},
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=52-6106&mode=dev",
    },
  },
  title: "Organisms/Gamification/FillGapsGame",
};

export default meta;

type Story = StoryObj<typeof FillGapsGame>;

export const Default: Story = {
  args: {
    fillGameParagraph: {
      id: "68129b54-3e96-4e34-bf71-a29f16d212da",
      richTextContent: {
        connections: [],
        json: {
          content: [
            {
              attrs: {
                textAlign: "left",
              },
              content: [
                {
                  marks: [
                    {
                      type: "italic",
                    },
                  ],
                  text: "Gemäß § {{366}} I {{HGB}}  wird nicht nur der gute Glaube an das {{Eigentum}}  des Veräußerers geschützt wie in §§ 932 ff. BGB. Es wird vielmehr auch der gute Glaube an die {{Verfügungsbefugnis;Berechtigung}}  geschützt. Diese ergibt sich hier möglicherweise aus der Ermächtigung gemäß § 185 BGB mit der L dem B erlaubt hat, die Ware im ordnungsgemäßen Geschäftsgang weiter zu verkaufen.",
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
                          marks: [
                            {
                              type: "italic",
                            },
                          ],
                          text: "Gemäß § {{366}} I {{HGB}} ",
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
                          marks: [
                            {
                              type: "italic",
                            },
                          ],
                          text: "Es wird vielmehr auch der gute Glaube an die {{Verfügungsbefugnis;Berechtigung}}",
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
          ],
          type: "doc",
        },
      },
    },
    helpNote: {
      id: "23442c1d-4302-461b-96b9-7ce1d773053e",
      richTextContent: {
        connections: [],
        json: {
          content: [
            {
              attrs: {
                textAlign: "left",
              },
              content: [
                {
                  marks: [
                    {
                      type: "italic",
                    },
                  ],
                  text: "Du prüfst also sowohl den guten Glauben an das Eigentum als auch an die Verfügungsbefugnis des B. In beiden Fällen ist im Ergebnis eine grobe Fahrlässigkeit zu bejahen, sodass L Eigentümer geblieben ist. Dies kannst du direkt aus dem Sachverhalt begründen.",
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
    question: "Um welche Norm geht es?",
  },
};
