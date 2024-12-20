import { BodyText } from "@/components/atoms/BodyText/BodyText";

import { Accordion } from "@mantine/core";
import { type FC, useState } from "react";

import { hintsAccordionStyles, ItemWrapper } from "./HintsAccordion.styles";

export interface HintsAccordionProps
{
  readonly items: string[];
}

export const HintsAccordion: FC<HintsAccordionProps> = ({ items }) =>
{
  const [value, setValue] = useState<string | null>(null);

  return (
    <Accordion onChange={setValue} value={value} styles={hintsAccordionStyles()}>
      <Accordion.Item value="hints">
        <Accordion.Control>
          <BodyText styleType="body-01-medium" component="p">
            {value ? "Antwort ausblenden" : "Antwort einblenden"}
          </BodyText>
        </Accordion.Control>
        <Accordion.Panel>
          {items?.[0] && (
            <ul>
              {items.map((item, index) => 
              {
                const splitItem = item.split(";");

                return (
                  <ItemWrapper key={index} index={index + 1}>
                    <BodyText styleType="body-01-regular" component="p">
                      {splitItem.map((answer) => answer.trim()).join(" oder ")}
                    </BodyText>
                  </ItemWrapper>
                );
              })}
            </ul>
          )}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
