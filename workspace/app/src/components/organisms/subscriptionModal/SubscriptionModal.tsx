/* eslint-disable max-lines */
import CaisyImg from "@/basic-components/CaisyImg";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import { Modal } from "@/components/molecules/Modal/Modal";
import { useSignout } from "@/hooks/useSignout";
import useSubscription from "@/hooks/useSubscription";
import { AuthStateContext } from "@/provider/AuthStateProvider";
import { api } from "@/utils/api";

import { Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { differenceInDays, formatDistance } from "date-fns";
import { de } from "date-fns/locale";
import { useRouter } from "next/router";
import { type FunctionComponent, useContext, useMemo, useState } from "react";
import { z } from "zod";

import ModalFlag from "../../../../public/images/placeholder-flag.png";

import { type SubscriptionDetails } from "@/server/api/routers/billing.router";
import { getIsPathAppPath } from "@/utils/paths";

const localStorageKey = "daysLeftToSubscriptionEnds";

type Props = {
  readonly subscriptionDetails: SubscriptionDetails;
};

const SubscriptionModalContent: FunctionComponent<Props> = ({ subscriptionDetails }) =>
{
  const { handleSignOut } = useSignout();
  const router = useRouter();
  const [wasClosed, setWasClosed] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutateAsync: generateStripeCheckoutSession } = api.billing.generateStripeCheckoutSession.useMutation();
  const { mutateAsync: generateStripeBillingPortalSession } = api.billing.generateStripeBillingPortalSession.useMutation();
  const { futureSubscriptionStatus, hasSubscription } = subscriptionDetails;
  const [daysCheckedForSubscriptionEnds, setDaysCheckedForSubscriptionEnds] = useLocalStorage<string[]>({
    defaultValue: [],
    deserialize: (localStorageValue) => 
    {
      let daysLeftToSubscriptionEnds: string[];

      try
      {
        const parsedValue = JSON.parse(localStorageValue);
        daysLeftToSubscriptionEnds = z.string().array().parse(parsedValue);
      }
      catch (e: unknown)
      {
        localStorage.setItem(localStorageKey, JSON.stringify([]));
        daysLeftToSubscriptionEnds = [];
      }

      return daysLeftToSubscriptionEnds;
    },
    getInitialValueInEffect: false,
    key: localStorageKey,
    serialize: (value) => JSON.stringify(value)
  });

  const { diffDays, subscriptionEndDate, today } = useMemo(() =>
  {
    const subscriptionEndDate = subscriptionDetails.stripeSubscription.current_period_end;
    const today: Date = new Date();
    // const today: Date = new Date(2024, 3, 7, 8, 27);
    const endDate = new Date(subscriptionEndDate * 1000);
    const diffDays = differenceInDays(endDate, today);
    return { diffDays, subscriptionEndDate: endDate, today };
  }, [subscriptionDetails.stripeSubscription.current_period_end]);

  const todayDateAsString = new Date().toISOString().split("T")[0] as string;

  const isOpened = ((
    !hasSubscription
  ) || (
    !wasClosed &&
    !daysCheckedForSubscriptionEnds?.includes(todayDateAsString) &&
    (futureSubscriptionStatus === "trialWillExpire" || futureSubscriptionStatus === "willBeCanceled") &&
    (diffDays === 3 || diffDays === 1 || (diffDays != null && diffDays <= 0))
  )) ?? false;

  const isModalLocked = diffDays == null || !hasSubscription;

  const redirectToStripe = async (): Promise<void> =>
  {
    setIsLoading(true);

    try
    {
      let url: string;

      if(hasSubscription)
      {
        url = await generateStripeBillingPortalSession();
      }
      else
      {
        url = await generateStripeCheckoutSession();
      }

      void router.push(url);
    }
    catch (error)
    {
      console.error("error while getting stripe session url", error);
      setIsLoading(false);
      return;
    }
  };

  let title: string | null = null;

  if(!hasSubscription)
  {
    title = "Dein Abonnement ist abgelaufen";
  }
  else
  {
    const distanceToSubscriptionEnd = formatDistance(subscriptionEndDate, today, { addSuffix: true, locale: de });

    if(futureSubscriptionStatus === "trialWillExpire")
    {
      title = `Dein Testzeitraum läuft ${distanceToSubscriptionEnd} ab`;
    }
    else if(futureSubscriptionStatus === "willBeCanceled")
    {
      title = `Dein Abonnement läuft ${distanceToSubscriptionEnd} ab`;
    }
  }

  return (
    <Modal
      opened={isOpened}
      centered
      lockScroll={isOpened}
      onClose={() => 
      {
        setWasClosed(true);
        setDaysCheckedForSubscriptionEnds((prevDaysChecked) => [...prevDaysChecked, todayDateAsString]);
      }}
      closeOnClickOutside={!isModalLocked}
      closeOnEscape={!isModalLocked}
      withCloseButton={!isModalLocked}
      title="">
      <CaisyImg src={ModalFlag.src}/>
      <Title order={2} ta="center">
        {title}
      </Title>
      <BodyText ta="center" styleType="body-01-regular" component="p">
        Jetzt Constellatio abonnieren, um weiterhin alle Vorteile digitalen Lernens zu genießen.
        Wenn du dir noch nicht ganz sicher bist, kannst du{" "}
        <CustomLink
          href="https://www.constellatio.de/preise"
          target="_blank"
          rel="noopener noreferrer"
          styleType="link-primary"
          c="neutrals-01.7">
          hier
        </CustomLink>
        {" "}klicken, um dir noch einmal unsere Preise anzuschauen.
      </BodyText>
      <div style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        width: "100%"
      }}>
        {!hasSubscription && (
          <Button<"button">
            size="large"
            w="48%"
            styleType="secondarySubtle"
            onClick={handleSignOut}>
            Logout
          </Button>
        )}
        <Button<"button">
          size="large"
          w={hasSubscription ? "100%" : "48%"}
          styleType="primary"
          loading={isLoading}
          onClick={redirectToStripe}>
          Jetzt abonnieren
        </Button>
      </div>
    </Modal>
  );
};

const SubscriptionModal: FunctionComponent = () =>
{
  const router = useRouter();
  const { data: subscriptionDetails } = useSubscription();
  const { isUserLoggedIn } = useContext(AuthStateContext);
  const isPathAppPath = getIsPathAppPath(router.pathname);

  if(!isUserLoggedIn)
  {
    return null;
  }

  if(!isPathAppPath)
  {
    return null;
  }

  if(!subscriptionDetails)
  {
    return null;
  }

  return <SubscriptionModalContent subscriptionDetails={subscriptionDetails}/>;
};

export default SubscriptionModal;
