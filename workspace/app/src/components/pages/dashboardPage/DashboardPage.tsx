import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import DashboardCallToActionBlock from "@/components/organisms/dashboardCallToActionBlock/DashboardCallToActionBlock";
import DashboardCasesBlock from "@/components/organisms/dashboardCasesBlock/DashboardCasesBlock";
import DashboardHeader from "@/components/organisms/dashboardHeader/DashboardHeader";
import DashboardLastEditedBlock from "@/components/organisms/dashboardLastEditedBlock/DashboardLastEditedBlock";
import DashboardLearningPathBlock from "@/components/organisms/dashboardLearningPathBlock/DashboardLearningPathBlock";
import DashboardPersonalSpaceBlock from "@/components/organisms/dashboardPersonalSpaceBlock/DashboardPersonalSpaceBlock";
import { type GetDashboardPagePropsResult } from "@/pages/dashboard";

import { type FunctionComponent } from "react";

import * as styles from "./DashboardPage.styles";

const DashboardPage: FunctionComponent<GetDashboardPagePropsResult> = ({ allLearningPaths }) => (
  <div>
    <DashboardHeader/>
    <ContentWrapper stylesOverrides={styles.sections}>
      <DashboardCallToActionBlock/>
      {allLearningPaths?.map(learningPath => (
        <DashboardLearningPathBlock key={learningPath.id} {...learningPath}/>
      ))}
      <DashboardLastEditedBlock/>
      <DashboardPersonalSpaceBlock/>
      <DashboardCasesBlock/>
    </ContentWrapper>
  </div>
);

export default DashboardPage;
