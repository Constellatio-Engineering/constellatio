import DashboardCallToActionBlockHeader from "@/components/organisms/dashboardCallToActionBlock/dashboardCallToActionBlockHeader/DashboardCallToActionBlockHeader";

import { appPaths } from "@constellatio/shared/paths";
import { type FunctionComponent } from "react";

import * as styles from "./DashboardCallToActionBlock.styles";
import DashboardCallToActionBlockCard from "./dashboardCallToActionBlockCard/DashboardCallToActionBlockCard";

const DashboardCallToActionBlock: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <div css={styles.innerWrapper}>
      <DashboardCallToActionBlockHeader/>
      <div css={styles.callToActionBlock}>
        <DashboardCallToActionBlockCard 
          icon="document"
          title="Dokument erstellen" 
          subText="Mit den Constellatio Dokumenten kannst du deine Gedanken während der Vorlesung und beim Lernen sicher aufzeichnen." 
          buttonText="Dokument erstellen"
          href={appPaths.personalSpace}
        />
        <DashboardCallToActionBlockCard 
          icon="upload"
          title="Datei hochladen" 
          subText="Constellatio hilft dir deine Dateien zu verwalten. Lade jetzt deine Dateien hoch." 
          buttonText="Datei hochladen"
          href={appPaths.personalSpace}
        />
        <DashboardCallToActionBlockCard 
          icon="flag"
          title="Freunde Werben" 
          subText="Werbe einen Freund für Constellatio und erhalte bis zu 100€." 
          buttonText="Freunde werben"
          href={appPaths.profile + "?tab=referral"}
        />
      </div>
    </div>
  </div>
);

export default DashboardCallToActionBlock;
