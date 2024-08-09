import CaisyImg from "@/basic-components/CaisyImg";

import React, { type FunctionComponent } from "react";

import * as styles from "./ProfilePageHeader.styles";
import Flag from "../../../../public/images/flag-big.png";
import OverviewHeader from "../OverviewHeader/OverviewHeader";

const ProfilePageHeader: FunctionComponent = () => 
{
  return (
    <div css={styles.wrapper}>
      <div css={styles.headerImgs}>
        <CaisyImg
          src={Flag.src}
          description="header flag img"
          width={200}
          height={200}
        />
        <CaisyImg
          src={Flag.src}
          description="header flag img"
          width={200}
          height={200}
        />
        <CaisyImg
          src={Flag.src}
          description="header flag img"
          width={200}
          height={200}
        />
      </div>
      <OverviewHeader variant="red"/>
    </div>
  );
};

export default ProfilePageHeader;
