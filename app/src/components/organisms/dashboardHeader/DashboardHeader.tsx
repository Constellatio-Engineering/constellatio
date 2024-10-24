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
  const { isLoading, userDetails } = useUserDetails();
  const firstName = userDetails?.firstName;

  return (
    <div css={styles.wrapper}>
      <OverviewHeader variant="red" height={490}/>
      <ContentWrapper stylesOverrides={styles.contentContainer}>
        <div css={styles.headerTitleWrapper}>
          <Title css={styles.headerTitle} order={1}>
            Willkommen
            {isLoading ? " ..." : firstName ? `, ${firstName}!` : " bei Constellatio!"}
          </Title>
        </div>
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
