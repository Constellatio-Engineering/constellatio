import { TypographyStylesProvider } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./MantineRichtextRenderer.styles";

interface MantineRichtextRendererProps
{
  readonly htmlContent: string;
}

const MantineRichtextRenderer: FunctionComponent<MantineRichtextRendererProps> = ({ htmlContent }) => 
{
  return (
    <TypographyStylesProvider>
      <div css={styles.contentWrapper} dangerouslySetInnerHTML={{ __html: htmlContent }}/>
    </TypographyStylesProvider>
  );
};

export default MantineRichtextRenderer;
