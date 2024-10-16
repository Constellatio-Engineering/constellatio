import { ArrowUp } from "@/components/Icons/ArrowUp";
import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";
import { AuthStateContext } from "@/provider/AuthStateProvider";
import { scrollToTop } from "@/utils/utils";

import { useTheme } from "@emotion/react";
import { Tooltip } from "@mantine/core";
import React, { type FunctionComponent, useContext } from "react";

import * as styles from "./ScrollToTopButton.styles";

export const ScrollToTopButton: FunctionComponent = () => 
{
  const authState = useContext(AuthStateContext);
  const isUserLoggedIn = authState.isUserLoggedIn ?? false;
  const theme = useTheme();

  if(!isUserLoggedIn)
  {
    return null;
  }

  return (
    <Tooltip
      label={"Nach oben scrollen"}
      openDelay={600}
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
