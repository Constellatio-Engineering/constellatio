import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { env } from "@/env.mjs";
import { api } from "@/utils/api";

import { Loader, Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileReferralBlock.styles";

const ProfileReferralBlock: FunctionComponent = () => 
{
  const apiContext = api.useUtils();
  const { data: ownCode, error: ownCodeError, isLoading: isLoadingOwnCode } = api.referral.getOwnReferralCode.useQuery(undefined, {
    refetchOnMount: false,
    staleTime: Infinity
  });

  const { data: referrer, error: referrerError, isLoading: isLoadingReferrer } = api.referral.getOwnReferrer.useQuery(undefined, {
    refetchOnMount: false,
    staleTime: Infinity
  });

  const { data: referralCount, error: referralCountError, isLoading: isLoadingReferralCount } 
    = api.referral.getReferralCounts.useQuery(undefined, {
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
      {isLoadingReferrer ? (
        <Loader sx={{ margin: "0px" }}/>
      ) : (
        <div>
          {referrer && (
            <div>
              <Title order={3}>Geworben von: </Title>
              <BodyText styleType="body-01-regular" component="p">
                {referrer.displayName}
              </BodyText>
            </div>
          )}
        </div>
      )}
      {isLoadingOwnCode ? (
        <Loader sx={{ margin: "0px" }}/>
      ) : (
        <div>
          {ownCode ? (
            <div>
              <Title order={3}>Dein Referral Link</Title>
              <BodyText styleType="body-01-regular" component="p">
                {env.NEXT_PUBLIC_WEBSITE_URL}/register?ref_code={ownCode}
              </BodyText>
              <BodyText styleType="body-01-regular" component="p">
                Hinweis: Dir wird erst dann Guthaben für einen geworbenen Nutzer gutgeschrieben,
                nachdem der Nutzer seine Testphase beendet hat und zum ersten Mal bezahlt hat.
              </BodyText>
            </div>
          ) : isCreateReferralCodeLoading ? (
            <Loader sx={{ margin: "0px" }}/>
          ) : (
            <div>
              Link Generieren
              <Button<"button"> 
                styleType="secondarySimple"
                onClick={() => createReferralCode()}>
                Generieren
              </Button>
            </div>
          )}
        </div>
      )}
      {isLoadingReferralCount ? (
        <Loader sx={{ margin: "0px" }}/>
      ) : (
        <div>
          {referralCount && (
            <div>
              <Title order={3}>Anzahl geworbener Nutzer</Title>
              <BodyText styleType="body-01-regular" component="p">
                {referralCount.totalCount}
              </BodyText>
              <Title order={3}>Anzahl geworbener Nutzer (bezahlt)</Title>
              <BodyText styleType="body-01-regular" component="p">
                {referralCount.paidCount}
              </BodyText>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileReferralBlock;
