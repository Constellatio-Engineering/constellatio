/* eslint-disable max-lines */
import CaisyImg from "@/basic-components/CaisyImg";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import { Modal } from "@/components/molecules/Modal/Modal";
import { useSignout } from "@/hooks/useSignout";
import useSubscription from "@/hooks/useSubscription";
import { AuthStateContext } from "@/provider/AuthStateProvider";
import { type SubscriptionDetails } from "@/server/api/routers/billing.router";
import { api } from "@/utils/api";
import { getIsPathAppPath } from "@/utils/paths";

import { Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import {
  useMemo, type FunctionComponent, useState, useContext
} from "react";
import { z } from "zod";

import ModalFlag from "../../../../public/images/placeholder-flag.png";

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
  const { hasSubscription } = subscriptionDetails;

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

  const diffDays = useMemo((): number | null =>
  {
    const { subscriptionEndDate } = subscriptionDetails.dbSubscription;

    if(subscriptionEndDate == null)
    {
      return null; 
    }
    
    const today: Date = new Date();
    const endDate = new Date(subscriptionEndDate);
    today.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const diffTime = endDate?.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays;
  }, [subscriptionDetails]);

  const todayDateAsString = new Date().toISOString().split("T")[0] as string;

  const isOpened = ((
    !hasSubscription
  ) || (
    !wasClosed &&
    !daysCheckedForSubscriptionEnds?.includes(todayDateAsString) &&
    isOnTrailSubscription &&
    (diffDays === 3 || diffDays === 1 || (diffDays != null && diffDays <= 0))
  )) ?? false;

  const isModalLocked = (diffDays == null || diffDays <= 0) || !isOnValidSubscription;

  const redirectToStripeCheckout = async (): Promise<void> => 
  {
    setIsLoading(true);

    try
    {
      const { url } = await generateStripeCheckoutSession();
      void router.push(url);
    }
    catch (error)
    {
      console.error("error while getting stripe session url", error);
      setIsLoading(false);
      return;
    }
  };

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
        {!hasSubscription && "Dein Abonnement ist abgelaufen"}
        {(hasSubscription && willSubscriptionEndSoon) && `Dein Abonnement läuft nur noch ${diffDays} Tag${diffDays === 1 ? "" : "e"}`}
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
          onClick={redirectToStripeCheckout}>
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
