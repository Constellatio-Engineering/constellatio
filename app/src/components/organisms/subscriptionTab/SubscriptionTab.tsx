import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import useSubscription from "@/hooks/useSubscription";

import { Skeleton, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";

import * as styles from "./SubscriptionTab.styles";

const SubscriptionTab: FunctionComponent = () => 
{
  const isTabletScreen = useMediaQuery("(max-width: 1100px)"); 
  const {
    generateStripeSessionUrl,
    isOnPaidSubscription,
    isOnTrailSubscription,
    isSessionLoading,
    isSubscriptionDetailsLoading,
    subscriptionDetails
  } = useSubscription();
  const router = useRouter();

  const getDate = (): string | undefined =>
  {
    if(subscriptionDetails == null)
    {
      return undefined;
    }

    const rawEndData = subscriptionDetails.subscriptionEndDate;
    const day = String(rawEndData?.getUTCDate()).padStart(2, "0");  // padStart ensures it's always two digits
    const month = String((rawEndData?.getUTCMonth() ?? 0) + 1).padStart(2, "0");  // Months are 0-indexed in JS
    const year = rawEndData?.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };

  const redirectToStripeSession = async (): Promise<void> =>
  {
    let url: string;

    try
    {
      const { billingPortalSessionUrl, checkoutSessionUrl } = await generateStripeSessionUrl();

      if(!checkoutSessionUrl || !billingPortalSessionUrl) { throw new Error("No checkout or billing portal session url, Please contact your admin"); }

      url = isOnPaidSubscription ? billingPortalSessionUrl : checkoutSessionUrl;
    }
    catch (error)
    {
      console.error("error while getting stripe session url", error);
      return;
    }

    void router.push(url);
  };

  if(isSubscriptionDetailsLoading)
  {
    return (
      <div css={styles.wrapper}>
        <Skeleton height={32} mb={50} width={100}/>
        <Skeleton height={20} mb={30} width="70%"/>
        <Skeleton height={30} mb={30} width="100%"/>
      </div>
    );
  }

  if(subscriptionDetails == null)
  {
    return (
      <BodyText m="32px 0" styleType="body-01-bold" component="p">
        Das ist leider etwas schief gelaufen. Bitte versuche es später erneut.
      </BodyText>
    );
  }

  return (
    <div css={styles.wrapper}>
      {!isTabletScreen && <Title order={3} css={styles.subscriptionTabTitle}>Vertrag</Title>}
      <BodyText m="32px 0" styleType="body-01-bold" component="p">
        {isOnPaidSubscription && `Dein Abonnement läuft noch bis zum ${getDate()}`}
        {isOnTrailSubscription && `Dein Test-Abo endet am ${getDate()}`}
        {(!isOnPaidSubscription) && "Schließe jetzt dein Constellatio Abonnement ab:"}
      </BodyText>
      {/* <SubscriptionCard/> */}
      <Button<"button">
        styleType="primary"
        style={{ display: "block", width: "100%" }}
        onClick={redirectToStripeSession}
        loading={isSessionLoading}>
        {isOnPaidSubscription ? "Abonnement verwalten" : "Abonnieren"}
      </Button>
    </div>
  );
};

export default SubscriptionTab;
