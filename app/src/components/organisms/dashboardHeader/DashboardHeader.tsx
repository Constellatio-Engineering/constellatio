import useUserDetails from "@/hooks/useUserDetails";

import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardHeader.styles";
import BadgesCarouselBlock from "../badgesCarouselBlock/BadgesCarouselBlock";
import { LearningTimeCard } from "../learninTimeCard/LearningTimeCard";
import OverviewHeader from "../OverviewHeader/OverviewHeader";
// import DashboardheaderProgressBar from "../dashboardheaderProgressBar/DashboardheaderProgressBar";

const DashboardHeader: FunctionComponent = () => 
{
  const { userDetails } = useUserDetails();

  return (
    <div css={styles.wrapper}>
      <OverviewHeader variant="red" height={500}/>
      <div css={styles.contentContainer}>
        <Title css={styles.headerTitle} order={1}>Willkommen{userDetails?.firstName && `, ${userDetails?.firstName}!`}</Title>
        {/* <DashboardheaderProgressBar/> */}
        <div css={styles.headerCardsArea}>
          <LearningTimeCard/>
          <BadgesCarouselBlock/>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
