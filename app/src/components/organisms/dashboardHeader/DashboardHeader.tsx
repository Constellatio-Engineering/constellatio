import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import useUserDetails from "@/hooks/useUserDetails";

import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardHeader.styles";
import BadgesCarouselBlock from "../badgesCarouselBlock/BadgesCarouselBlock";
import { LearningTimeCard } from "../learninTimeCard/LearningTimeCard";
import OverviewHeader from "../OverviewHeader/OverviewHeader";
import StreakCard from "../streakCard/StreakCard";
// import DashboardheaderProgressBar from "../dashboardheaderProgressBar/DashboardheaderProgressBar";

const DashboardHeader: FunctionComponent = () => 
{
  const { userDetails } = useUserDetails();

  return (
    <div css={styles.wrapper}>
      <OverviewHeader variant="red" height={490}/>
      <ContentWrapper stylesOverrides={styles.contentContainer}>
        <Title css={styles.headerTitle} order={1}>Willkommen{userDetails?.firstName && `, ${userDetails?.firstName}!`}</Title>
        {/* <DashboardheaderProgressBar/> */}
        <div css={styles.headerCardsArea}>
          <LearningTimeCard/>
          <StreakCard/>
          <BadgesCarouselBlock/>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default DashboardHeader;
