import { ArrowUp } from "@/components/Icons/ArrowUp";
import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";
import { scrollToTop } from "@/utils/utils";

import { useTheme } from "@emotion/react";
import { Tooltip } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./ScrollToTopButton.styles";

export const ScrollToTopButton: FunctionComponent = () => 
{
  const theme = useTheme();

  return (
    <Tooltip
      label={"Nach oben scrollen"}
      openDelay={1000}
      position={"left"}
      withArrow={true}>
      <UnstyledButton
        styles={styles.scrollToTopButtonStyles(theme)}
        onClick={() => scrollToTop()}>
        <ArrowUp/>
      </UnstyledButton>
    </Tooltip>
  );
};
