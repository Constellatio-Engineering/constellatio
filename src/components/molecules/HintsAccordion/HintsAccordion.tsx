import { Accordion } from "@mantine/core";
import React, { FC, useState } from "react";
import { ItemWrapper, hintsAccordionStyles } from "./HintsAccordion.styles";
import { BodyText } from "@/components/atoms/BodyText/BodyText";

type THintsAccordion = {
  items: string[];
};

export const HintsAccordion: FC<THintsAccordion> = ({ items }) => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Accordion onChange={setValue} value={value} styles={hintsAccordionStyles({})}>
      <Accordion.Item value="hints">
        <Accordion.Control>
          <BodyText styleType="body-01-regular" component="p">
            {value ? "Hide correct answers" : "Show correct answers"}
          </BodyText>
        </Accordion.Control>
        <Accordion.Panel>
          {items?.[0] && (
            <ul>
              {items.map((item, index) => {
                const splittedItem = item.split(";");

                return (
                  <ItemWrapper key={index} index={index + 1}>
                    <BodyText styleType="body-01-regular" component="p">
                      {splittedItem.map((answer) => answer.trim()).join(" or ")}
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
