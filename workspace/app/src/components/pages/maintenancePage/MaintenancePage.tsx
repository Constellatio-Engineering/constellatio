import Image from "next/image";
import { type FunctionComponent } from "react";

import * as styles from "./MaintenancePage.styles";
import ConstellatioFullLogoPng from "../../../../public/images/full-logo.png";

const MaintenancePage: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <Image src={ConstellatioFullLogoPng} css={styles.logo} alt="Constellatio Logo"/>
    <div css={styles.content}>
      <h1>Wartungsarbeiten</h1>
      <p>
        Wir versuchen stets, Constellatio für dich zu verbessern.<br/>
        Momentan führen wir Wartungsarbeiten durch und sind bald wieder für dich da.<br/>
        <strong>Vielen Dank für dein Verständnis.</strong>
      </p>
    </div>
  </div>
);

export default MaintenancePage;
