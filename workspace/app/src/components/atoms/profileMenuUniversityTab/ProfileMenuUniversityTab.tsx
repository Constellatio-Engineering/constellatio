import CaisyImg from "@/basic-components/CaisyImg";
import { transformSemesterToString } from "@/utils/data-transformation";

import Image from "next/image";
import { type FunctionComponent } from "react";

import UniversityIcon from "./iconmonstr-building-34-240.png";
import * as styles from "./ProfileMenuUniversityTab.styles";
import { BodyText } from "../BodyText/BodyText";

interface ProfileMenuUniversityTabProps
{
  readonly imgSrc?: string;
  readonly semester: number | null;
  readonly university: string | null;
}

const ProfileMenuUniversityTab: FunctionComponent<ProfileMenuUniversityTabProps> = ({ imgSrc, semester, university }) =>
{
  if(!university && !semester)
  {
    return null;
  }

  if(!university)
  {
    university = "Keine Universität angegeben";
  }

  return (
    <div css={styles.wrapper}>
      {imgSrc ? (
        <CaisyImg
          src={imgSrc}
          description="universityImg"
          width={50}
          height={50}
        />
      ) : (
        <div css={styles.universityIconWrapper}>
          <Image src={UniversityIcon} alt="Universität icon"/>
        </div>
      )}
      <div css={styles.text}>
        <BodyText styleType="body-01-medium" title={university} component="p">{university}</BodyText>
        {(semester != null) && <BodyText styleType="body-01-medium" component="p" css={styles.semesterText}>{transformSemesterToString(semester, true)}</BodyText>}
      </div>
    </div>
  );
};

export default ProfileMenuUniversityTab;
