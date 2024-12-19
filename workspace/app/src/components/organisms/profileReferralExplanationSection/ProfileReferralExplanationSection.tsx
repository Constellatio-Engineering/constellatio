import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import CopyToClipboard from "@/components/molecules/copyToClipboard/CopyToClipboard";
import { api } from "@/utils/api";

import { env } from "@constellatio/env";
import { Loader, Title } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "./ProfileReferralExplanationSection.styles";

const ProfileReferralCodeSection: FunctionComponent = () =>
{
  const apiContext = api.useUtils();
  const { data: ownCode, isLoading: isLoadingOwnCode } = api.referral.getOwnReferralCode.useQuery(undefined, {
    refetchOnMount: false,
    staleTime: Infinity
  });

  const { isPending: isCreateReferralCodeLoading, mutate: createReferralCode } = api.referral.createReferralCode.useMutation({
    onError: (error) => console.log("error while creating referral code", error),
    onSuccess: async (_data, variables) =>
    {
      console.log("success", variables);
      await apiContext.referral.getOwnReferralCode.invalidate();
    }
  });

  return (
    <div css={styles.wrapper}>
      <Title order={3}>
        Empfehle uns weiter und verdiene bares Geld!
      </Title>
      <p css={styles.hinweis}>
        So einfach funktioniert&apos;s: Für <b>jeden Freund</b>, den du erfolgreich wirbst und der zahlender Nutzer wird, bekommst du <b>10 €</b>.
      </p>
      <p css={styles.hinweis}>
        Aber es wird noch besser: Sobald du 5 zahlende Freunde geworben hast, legen wir <b>einen Bonus von 50 €</b> obendrauf. 
        Das bedeutet, du kannst mit 5 Empfehlungen <b>insgesamt 100 €</b> verdienen (5 x 10 € + 50 € Bonus)!
      </p>
    </div>
  );
};

export default ProfileReferralCodeSection;
