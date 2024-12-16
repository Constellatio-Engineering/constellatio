import { Button } from "@/components/atoms/Button/Button";
import { richTextParagraphOverwrite } from "@/components/helpers/richTextParagraphOverwrite";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import { ArrowUp } from "@/components/Icons/ArrowUp";
import { Richtext } from "@/components/molecules/Richtext/Richtext";

import { type IGenCallout } from "@constellatio/cms/generated-types";
import { Group, Stack } from "@mantine/core";
import { useMantineTheme } from "@mantine/styles";
import {
  type FC, useCallback, useEffect, useLayoutEffect, useRef, useState
} from "react";

import * as styles from "./Callout.styles";
import { HeadingType } from "./HeadingType";

export type CalloutProps = IGenCallout;

const expandableThreshold = 180;

export const Callout: FC<CalloutProps> = ({ calloutType, text }) =>
{
  const theme = useMantineTheme();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpandable, setIsExpandable] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState<number>(styles.collapsedHeight);

  const onSizeChange = useCallback((element: Element) =>
  {
    const contentHeight = element.scrollHeight;
    const shouldBeExpandable = contentHeight > expandableThreshold;
    setContentHeight(contentHeight);
    setIsExpandable(shouldBeExpandable);
  }, []);

  useLayoutEffect(() =>
  {
    const checkContentHeight = () => 
    {
      if(contentRef.current) 
      {
        onSizeChange(contentRef.current);
      }
    };

    checkContentHeight();
  }, [onSizeChange]);

  useEffect(() =>
  {
    const contentElement = contentRef.current;

    if(!contentElement)
    {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) =>
    {
      for(const entry of entries)
      {
        onSizeChange(entry.target);
      }
    });

    resizeObserver.observe(contentElement);

    return () => resizeObserver.unobserve(contentElement);
  }, [onSizeChange]);

  return (
    <Stack spacing="spacing-4" sx={styles.calloutStyles(theme, calloutType)}>
      <Group spacing="spacing-8">
        <HeadingType calloutType={calloutType}/>
      </Group>
      <div css={[styles.contentWrapper, isExpandable && styles.contentWrapperExpandable(isExpanded, contentHeight)]}>
        {isExpandable && (
          <div css={styles.fog(isExpanded)}/>
        )}
        <div ref={contentRef}>
          {text?.json && (
            <Richtext
              data={text}
              stylesOverwrite={styles.RichTextStyles}
              richTextOverwrite={{ paragraph: richTextParagraphOverwrite }}
            />
          )}
        </div>
      </div>
      {isExpandable && (
        <Button<"button">
          styleType="tertiary"
          onClick={() => setIsExpanded(!isExpanded)}
          rightIcon={isExpanded ? <ArrowUp size={20}/> : <ArrowDown size={20}/>}
          size="medium"
          style={{ alignSelf: "flex-start", marginTop: 4, zIndex: 2 }}>
          {isExpanded ? "Einklappen" : "Ausklappen"}
        </Button>
      )}
    </Stack>
  );
};
