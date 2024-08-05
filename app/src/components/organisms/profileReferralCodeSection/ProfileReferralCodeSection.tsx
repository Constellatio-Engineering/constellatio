import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import CopyToClipboard from "@/components/molecules/copyToClipboard/CopyToClipboard";
import { env } from "@/env.mjs";
import { api } from "@/utils/api";

import { Loader } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileReferralCodeSection.styles";

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
      {isLoadingOwnCode ? (
        <Loader sx={{ margin: "0px" }}/>
      ) : (
        <div>
          {ownCode ? (
            <div>
              <CopyToClipboard copyText={`${env.NEXT_PUBLIC_WEBSITE_URL}/register?ref_code=${ownCode}`}/>
              <p css={styles.hinweis}>
                Hinweis: Dir wird erst dann Guthaben für einen geworbenen Nutzer gutgeschrieben,
                nachdem der Nutzer seine Testphase beendet hat und zum ersten Mal bezahlt hat.
              </p>
            </div>
          ) : isCreateReferralCodeLoading ? (
            <Loader sx={{ margin: "0px" }}/>
          ) : (
            <div css={styles.noReferralCode}>
              <BodyText styleType="body-01-regular" component="p">
                Dir wurde noch kein Einladungslink zugewiesen.
              </BodyText>
              <Button<"button"> 
                styleType="secondarySimple"
                onClick={() => createReferralCode()}>
                Link erstellen
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileReferralCodeSection;
