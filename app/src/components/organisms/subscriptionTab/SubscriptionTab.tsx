import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import useSubscription from "@/hooks/useSubscription";
import { showErrorNotification } from "@/utils/notifications";

import { Skeleton, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";
import React, { type FunctionComponent, useState } from "react";

import * as styles from "./SubscriptionTab.styles";

const SubscriptionTab: FunctionComponent = () => 
{
  const isTabletScreen = useMediaQuery("(max-width: 1100px)"); 
  const { generateStripeBillingPortalSession, isSubscriptionDetailsLoading, subscriptionDetails } = useSubscription();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(subscriptionDetails?.stripeSubscription);

  const redirectToStripeSession = async (): Promise<void> =>
  {
    setIsLoading(true);

    try
    {
      const { url } = await generateStripeBillingPortalSession();
      void router.push(url);
    }
    catch (error)
    {
      console.error("error while getting stripe session url", error);

      showErrorNotification({
        message: "Bitte versuche es später erneut oder kontaktiere den Support.",
        title: "Fehler beim Öffnen der Zahlungsseite"
      });

      setIsLoading(false);
      return;
    }
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

  const {
    cancel_at: cancelAt,
    default_payment_method: defaultPaymentMethod,
    status,
    trial_end: trialEnd
  } = subscriptionDetails.stripeSubscription;

  let text: string;

  if(cancelAt)
  {
    text = `Dein Abonnement wurde gekündigt und läuft noch bis ${new Date(cancelAt * 1000).toLocaleDateString("de")}`;
  }
  else if(status === "trialing")
  {
    if(trialEnd == null)
    {
      text = "Da ist leider etwas schief gelaufen. Das Enddatum deiner Testphase konnte nicht abgerufen werden. Bitte kontaktiere den Support.";
    }
    else
    {
      const trialEndUnixDateString = new Date(trialEnd * 1000).toLocaleDateString("de");

      if(defaultPaymentMethod == null)
      {
        text = `Dein Test-Abo endet am ${trialEndUnixDateString}. Bitte hinterlege deine Zahlungsinformationen, um dein Abonnement zu verlängern.`;
      }
      else
      {
        text = `Dein Test-Abo läuft noch bis zum ${trialEndUnixDateString}. Da deine Zahlungsinformationen hinterlegt sind, wird dein Abonnement automatisch verlängert. Du kannst es jederzeit kündigen.`;
      }
    }
  }
  else
  {
    text = "Vielen Dank, dass du Constellatio abonniert hast! Dein Abonnement verlängert sich automatisch, du kannst es jedoch jederzeit kündigen.";
  }

  return (
    <div css={styles.wrapper}>
      {!isTabletScreen && <Title order={3} css={styles.subscriptionTabTitle}>Abonnement</Title>}
      <BodyText m="32px 0" styleType="body-01-bold" component="p">
        {text}
      </BodyText>
      <Button<"button">
        styleType="primary"
        style={{ display: "block", width: "100%" }}
        onClick={redirectToStripeSession}
        loading={isLoading}>
        {"Abonnement verwalten"}
      </Button>
    </div>
  );
};

export default SubscriptionTab;
