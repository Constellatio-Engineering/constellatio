import React, { type FunctionComponent } from "react";

import * as styles from "./FloatingPanel.styles";

export interface IFloatingPanelProps
{

}

const FloatingPanel: FunctionComponent<IFloatingPanelProps> = ({  }) => {
  return (
    <div css={styles.wrapper}>
      FloatingPanel
    </div>
  );
};

export default FloatingPanel;
