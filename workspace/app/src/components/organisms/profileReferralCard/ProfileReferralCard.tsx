import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";

import { Title } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "./ProfileReferralCard.styles";

interface Props
{
  readonly icon: React.ReactNode;
  readonly subText?: string | number;
  readonly title: string;
}

const ProfileReferralCard: FunctionComponent<Props> = ({ icon, subText, title }) => 
{
  return (  
    <div css={styles.wrapper}>
      {icon && <div css={styles.icon}>{icon}</div>}
      {title && <div><Title order={3}>{title}</Title></div>}
      {subText != null && (
        <div css={styles.labelWrapper}>
          <CaptionText styleType="caption-01-bold">
            {subText}
          </CaptionText>
        </div>
      )}
    </div>
  );
};

export default ProfileReferralCard;
