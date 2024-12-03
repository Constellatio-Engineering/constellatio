import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import DashboardCasesBlock from "@/components/organisms/dashboardCasesBlock/DashboardCasesBlock";
import DashboardHeader from "@/components/organisms/dashboardHeader/DashboardHeader";
import DashboardLastEditedBlock from "@/components/organisms/dashboardLastEditedBlock/DashboardLastEditedBlock";
import DashboardPersonalSpaceBlock from "@/components/organisms/dashboardPersonalSpaceBlock/DashboardPersonalSpaceBlock";
import { LearningPath } from "@/components/pages/dashboardPage/learningPath/LearningPath";
import { type GetDashboardPagePropsResult } from "@/pages/dashboard";

import { type FunctionComponent } from "react";

import * as styles from "./DashboardPage.styles";

const DashboardPage: FunctionComponent<GetDashboardPagePropsResult> = ({ learningPath }) => (
  <div>
    <DashboardHeader/>
    <ContentWrapper stylesOverrides={styles.sections}>
      {learningPath && (
        <LearningPath {...learningPath}/>
      )}
      <DashboardLastEditedBlock/>
      <DashboardPersonalSpaceBlock/>
      <DashboardCasesBlock/>
    </ContentWrapper>
  </div>
);

export default DashboardPage;
