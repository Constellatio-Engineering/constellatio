import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";

import { type Nullable } from "@constellatio/utility-types";
import { type FunctionComponent, type ReactNode } from "react";

import * as styles from "./GameComponentWrapper.styles";

type Props = {
  readonly children: ReactNode;
  readonly currentGameId: Nullable<string>;
  readonly gameId: string;
};

const GameComponentWrapper: FunctionComponent<Props> = ({ children, currentGameId, gameId }) => (
  <div css={styles.gameComponentWrapper}>
    {children}
    {gameId === currentGameId && (
      <CaptionText styleType="caption-01-medium" mt={12}>Beantworte die Frage, um in der Fallbearbeitung weiter zu kommen.</CaptionText>
    )}
  </div>
);

export default GameComponentWrapper;
