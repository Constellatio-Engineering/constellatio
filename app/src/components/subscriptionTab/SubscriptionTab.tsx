import useSubscription from "@/hooks/useSubscription";

import { Title } from "@mantine/core";
import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";

import * as styles from "./SubscriptionTab.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import { Button } from "../atoms/Button/Button";
import SubscriptionCard from "../subscriptionCard/SubscriptionCard";

const SubscriptionTab: FunctionComponent<{readonly subscriptionStatus?: string}> = ({ subscriptionStatus }) => 
{
  const {
    generateStripeSessionUrl,
    isSessionLoading,
    isSubscriptionDetailsLoading,
    subscriptionDetails
  } = useSubscription();

  const router = useRouter();

  const redirectToCustomerPortal = async (): Promise<void> =>
  {
    let url: string | null;

    try
    {
      const { stripeUrl } = await generateStripeSessionUrl();
      url = stripeUrl;
    }
    catch (error)
    {
      console.error("error while getting stripe session url", error);
      return;
    }

    if(url)
    {
      void router.push(url);
    }
    else 
    {
      console.error("error while getting stripe session url");
    }
  };

  // console.log("subscriptionDetails", subscriptionDetails, "error", error, "isLoading", isLoading);
  return (
    <div css={styles.wrapper}>
      <Title order={3}>Subscription</Title>
      <BodyText m="32px 0" styleType="body-01-regular" component="p">{subscriptionStatus ?? "Manage your subscription by clicking the button below:"}</BodyText>
      <SubscriptionCard/>
      {subscriptionDetails.subscriptionStatus !== "active" && (
        <Button<"button">
          styleType="primary"
          fullWidth
          loading={isSessionLoading}
          onClick={redirectToCustomerPortal}>
          Buy subscription
        </Button>
      )}
      {/* <Button<"button"> styleType="primary" style={{ display: "block", width: "100%" }}>Manage subscription</Button> */}
    </div>
  );
};

export default SubscriptionTab;
