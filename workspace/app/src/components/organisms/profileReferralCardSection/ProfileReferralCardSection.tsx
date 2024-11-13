import { Check } from "@/components/Icons/Check";
import { ClapHands } from "@/components/Icons/ClapHands";
import { Heart } from "@/components/Icons/Heart";
import { api } from "@/utils/api";

import { type FunctionComponent } from "react";

import * as styles from "./ProfileReferralCardSection.styles";
import ProfileReferralCard from "../profileReferralCard/ProfileReferralCard";

const ProfileReferralCardSection: FunctionComponent = () =>
{
  const { data: referrer } = api.referral.getOwnReferrer.useQuery(undefined, {
    refetchOnMount: false,
    staleTime: Infinity
  });

  const { data: referralCount } = api.referral.getReferralCounts.useQuery(undefined, {
    refetchOnMount: false,
    staleTime: Infinity
  });

  return (
    <div css={styles.wrapper}>
      <ProfileReferralCard
        icon={<Heart/>}
        title={"Einladungen"}
        subText={referralCount?.totalCount ?? 0}
      />
      <ProfileReferralCard
        icon={<Check/>}
        title={"Bestätigte Einladungen"}
        subText={referralCount?.paidCount ?? 0}
      />
      <ProfileReferralCard
        icon={<ClapHands/>}
        title={"Eingeladen von"}
        subText={referrer?.displayName ?? "nicht eingeladen"}
      />
    </div>
  );
};

export default ProfileReferralCardSection;
