import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import { env } from "@/env.mjs";
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
      <OverviewHeader variant="red" height={500}/>
      <ContentWrapper stylesOverrides={styles.contentContainer}>
        <Title css={styles.headerTitle} order={1}>Willkommen{userDetails?.firstName && `, ${userDetails?.firstName}!`}</Title>
        {/* <DashboardheaderProgressBar/> */}
        <div css={styles.streakCardContainer}>
          <StreakCard/>
        </div>
        <div css={styles.headerCardsArea}>
          {env.NEXT_PUBLIC_IS_USAGE_TIME_CHART_ENABLED && (
            <LearningTimeCard/>
          )}
          <BadgesCarouselBlock/>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default DashboardHeader;
