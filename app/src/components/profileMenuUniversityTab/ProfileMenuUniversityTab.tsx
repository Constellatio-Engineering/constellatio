import CaisyImg from "@/basic-components/CaisyImg";

import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileMenuUniversityTab.styles";
import { BodyText } from "../atoms/BodyText/BodyText";

interface ProfileMenuUniversityTabProps
{
  readonly imgSrc: string;
  readonly semester: string;
  readonly title: string;
}

const ProfileMenuUniversityTab: FunctionComponent<ProfileMenuUniversityTabProps> = ({ imgSrc, semester, title }) => 
{
  return (
    <div css={styles.wrapper}>
      {imgSrc && (
        <CaisyImg
          src={imgSrc}
          description="universityImg"
          width={50}
          height={50}
        />
      )}
      <div css={styles.text}>
        {title && <BodyText styleType="body-01-medium" title={title} component="p">{title}</BodyText>}
        {semester && <BodyText styleType="body-01-medium" component="p" css={styles.semesterText}>{semester}</BodyText>}
      </div>
    </div>
  );
};

export default ProfileMenuUniversityTab;
