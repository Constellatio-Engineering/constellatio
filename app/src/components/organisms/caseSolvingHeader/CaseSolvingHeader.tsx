import React, { FunctionComponent } from "react";

import * as styles from "./CaseSolvingHeader.styles";
import bgOverlay from "../../Icons/bg-layer.png";

export interface ICaseSolvingHeaderProps
{
  title:string;
}

const CaseSolvingHeader: FunctionComponent<ICaseSolvingHeaderProps> = ({ title }) => (
  <div css={styles.wrapper}>
    <div id="bg-overlay"><img src={bgOverlay.src} alt="lines" width={100} height={100} /></div>
    <div className="text">{title}</div>
  </div>
);

export default CaseSolvingHeader;
