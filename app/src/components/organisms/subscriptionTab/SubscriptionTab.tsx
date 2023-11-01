import useSubscription from "@/hooks/useSubscription";

import { Skeleton, Title } from "@mantine/core";
import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";

import * as styles from "./SubscriptionTab.styles";
import { BodyText } from "../../atoms/BodyText/BodyText";
import { Button } from "../../atoms/Button/Button";

const SubscriptionTab: FunctionComponent = () => 
{
  const {
    generateStripeSessionUrl,
    hasSubscription,
    isSessionLoading,
    isSubscriptionDetailsLoading,
    subscriptionDetails
  } = useSubscription();
  const router = useRouter();

  const getDate = (): string | undefined => 
  {
    if(subscriptionDetails == null) { return undefined; }
  
    const rawEndData = subscriptionDetails.subscriptionEndDate;
    if(!rawEndData) { return undefined; }
  
    const day = String(rawEndData.getUTCDate()).padStart(2, "0");  // padStart ensures it's always two digits
  
    // Array of month names to convert month number to month name
    const monthNames = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];
  
    const monthName = monthNames[rawEndData.getUTCMonth()];  // Months are 0-indexed in JS
    const year = rawEndData.getUTCFullYear();
  
    return `${day}. ${monthName} ${year}`;
  };

  const redirectToStripeSession = async (): Promise<void> =>
  {
    let url: string;

    try
    {
      const { billingPortalSessionUrl, checkoutSessionUrl } = await generateStripeSessionUrl();

      if(!checkoutSessionUrl || !billingPortalSessionUrl) { throw new Error("No checkout or billing portal session url, Please contact your admin"); }

      url = hasSubscription ? billingPortalSessionUrl : checkoutSessionUrl;
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

  const { subscriptionStatus } = subscriptionDetails;

  return (
    <div css={styles.wrapper}>
      <Title order={3} css={styles.subscriptionTabTitle}>Vertrag</Title>
      <BodyText m="32px 0" styleType="body-01-medium" component="p">
        {subscriptionStatus === "active" && `Dein Abonnement läuft noch bis zum ${getDate()}`}
        {subscriptionStatus === "trialing" && `Dein Test-Abo endet am ${getDate()}`}
        {!hasSubscription && "Schließe jetzt dein Constellatio Abonnement ab:"}
      </BodyText>
      {/* <SubscriptionCard/> */}
      <Button<"button">
        styleType="primary"
        style={{ display: "block", width: "100%" }}
        onClick={redirectToStripeSession}
        loading={isSessionLoading}>
        {hasSubscription ? "Abonnement verwalten" : "Abonnieren"}
      </Button>
    </div>
  );
};

export default SubscriptionTab;
