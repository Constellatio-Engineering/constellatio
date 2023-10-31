import useSubscription from "@/hooks/useSubscription";

import { Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";

import * as styles from "./SubscriptionTab.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import { Button } from "../atoms/Button/Button";

const SubscriptionTab: FunctionComponent = () => 
{
  const isTabletScreen = useMediaQuery("(max-width: 1100px)"); 
  const { generateStripeSessionUrl, isSessionLoading, subscriptionDetails } = useSubscription();
  const router = useRouter();

  const getDate = (): string => 
  {
    if(subscriptionDetails.subscriptionStatus === "active" || subscriptionDetails.subscriptionStatus === "trialing" && !subscriptionDetails.subscriptionEndDate) { console.error("No subscription end date, Please contact your admin"); }

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

      url = (subscriptionDetails.subscriptionStatus === "active" || subscriptionDetails.subscriptionStatus === "trialing") ? billingPortalSessionUrl : checkoutSessionUrl;
    }
    catch (error)
    {
      console.error("error while getting stripe session url", error);
      return;
    }

    void router.push(url);
  };

  return (
    <div css={styles.wrapper}>
      {!isTabletScreen && <Title order={3} css={styles.subscriptionTabTitle}>Vertrag</Title>}
      <BodyText m="32px 0" styleType="body-01-bold" component="p">
        {subscriptionDetails.subscriptionStatus === "active" ? `Dein Abonnement läuft noch bis zum ${getDate()}` : subscriptionDetails.subscriptionStatus === "trialing" ? `Dein Test-Abo endet am ${getDate()}` : "Schließe jetzt dein Constellatio Abonnement ab:"}
      </BodyText>
      {/* <SubscriptionCard/> */}
      <Button<"button">
        styleType="primary"
        style={{ display: "block", width: "100%" }}
        onClick={redirectToStripeSession}
        loading={isSessionLoading}>
        {(subscriptionDetails.subscriptionStatus === "active" || subscriptionDetails.subscriptionStatus === "trialing") ? "Abonnement verwalten" : "Abonnieren"}
      </Button>
    </div>
  );
};

export default SubscriptionTab;
