import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import DashboardCasesBlock from "@/components/organisms/dashboardCasesBlock/DashboardCasesBlock";
import DashboardHeader from "@/components/organisms/dashboardHeader/DashboardHeader";
import DashboardLastEditedBlock from "@/components/organisms/dashboardLastEditedBlock/DashboardLastEditedBlock";
import DashboardPersonalSpaceBlock from "@/components/organisms/dashboardPersonalSpaceBlock/DashboardPersonalSpaceBlock";

import { type FunctionComponent } from "react";

import * as styles from "./DashboardPage.styles";

const DashboardPage: FunctionComponent = () => (
  <div>
    <DashboardHeader/>
    <ContentWrapper stylesOverrides={styles.sections}>
      <DashboardLastEditedBlock/>
      <DashboardPersonalSpaceBlock/>
      <DashboardCasesBlock/>
    </ContentWrapper>
  </div>
);

export default DashboardPage;
