import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardHeader.styles";
import BadgesCarouselBlock from "../badgesCarouselBlock/BadgesCarouselBlock";
import DashboardheaderProgressBar from "../dashboardheaderProgressBar/DashboardheaderProgressBar";
import LearninTimeCard from "../learninTimeCard/LearninTimeCard";
import OverviewHeader from "../organisms/OverviewHeader/OverviewHeader";

const DashboardHeader: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <OverviewHeader variant="red"/>
    <div css={styles.contentContainer}>
      <Title css={styles.headerTitle} order={1}>Welcome Back, fName!</Title>
      <DashboardheaderProgressBar/>
      <div css={styles.headerCardsArea}>
        <LearninTimeCard/>
        <BadgesCarouselBlock/>
      </div>
    </div>
  </div>
);

export default DashboardHeader;
