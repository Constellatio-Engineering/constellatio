import { Check } from "@/components/Icons/Check";

import type { SerializedStyles } from "@emotion/react";
import React, { type FunctionComponent, type ReactNode } from "react";

import * as styles from "./ForumListItem.styles";

type Props = {
  readonly children: ReactNode;
  readonly contentWrapperStylesOverrides?: SerializedStyles;
  readonly isMarkedAsCorrect?: boolean;
  readonly stylesOverrides?: SerializedStyles;
};

const ForumListItem: FunctionComponent<Props> = ({
  children,
  contentWrapperStylesOverrides,
  isMarkedAsCorrect,
  stylesOverrides
}) =>
{
  return (
    <div css={[styles.wrapper, stylesOverrides, isMarkedAsCorrect && styles.wrapperCorrectAnswer]}>
      {isMarkedAsCorrect && (
        <div css={styles.correctAnswerBanner}>
          <div css={styles.checkIconWrapper}>
            <Check/>
          </div>
          <span>Richtige Antwort</span>
        </div>
      )}
      <div css={[styles.contentWrapper, contentWrapperStylesOverrides, isMarkedAsCorrect && styles.contentWrapperCorrectAnswer]}>
        {children}
      </div>
    </div>
  );
};

export default ForumListItem;
