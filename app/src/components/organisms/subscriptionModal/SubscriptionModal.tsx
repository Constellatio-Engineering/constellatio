
// import * as styles from "./SubscriptionModal.styles";
import CaisyImg from "@/basic-components/CaisyImg";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Modal } from "@/components/molecules/Modal/Modal";
import useSubscription from "@/hooks/useSubscription";

import { Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useMemo, type FunctionComponent, useState } from "react";
import { z } from "zod";

import ModalFlag from "../../../../public/images/placeholder-flag.png";

const localStorageKey = "daysLeftToSubscriptionEnds";

const SubscriptionModal: FunctionComponent = () => 
{
  const router = useRouter();
  const { generateStripeSessionUrl, isOnTrailSubscription, subscriptionDetails } = useSubscription();
  const [isParsed, setIsParsed] = useState(false);
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

      setIsParsed(true);
      return daysLeftToSubscriptionEnds;
    },
    key: localStorageKey,
    serialize: (value) => JSON.stringify(value)
  });

  const todayDateAsString = useMemo(() => new Date().toISOString().split("T")[0] as string, []);

  const diffDays = useMemo((): number | null => 
  {
    if(subscriptionDetails == null)
    {
      return null; 
    }

    const { subscriptionEndDate } = subscriptionDetails;

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

  const [wasClosed, setWasClosed] = useState(false);

  const isOpened = !wasClosed && isParsed && !daysCheckedForSubscriptionEnds.includes(todayDateAsString) && isOnTrailSubscription;
  const isModalLocked = diffDays == null || diffDays <= 0;

  const redirectToStripeCheckout = async (): Promise<void> => 
  {
    let url: string;

    try
    {
      const { checkoutSessionUrl } = await generateStripeSessionUrl();

      if(!checkoutSessionUrl) { throw new Error("No checkout session url, Please contact your admin"); }

      url = checkoutSessionUrl;
    }
    catch (error)
    {
      console.error("error while getting stripe session url", error);
      return;
    }

    void router.push(url);

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
        {
          diffDays != null && (
            <>
              {isOnTrailSubscription && `Deine Testphase läuft nur noch ${diffDays} Tage`}
              {diffDays <= 0 && "Deine Testphase ist abgelaufen"}
            </>
          )
        }
        
      </Title>
      <BodyText ta="center" styleType="body-01-regular" component="p">Jetzt Constellatio abonnieren, um weiterhin alle Vorteile digitalen Lernens zu genießen</BodyText>
      <Button<"button">
        size="large"
        miw="100%"
        styleType="primary"
        onClick={redirectToStripeCheckout}>Jetzt abonnieren
      </Button>
    </Modal>
  );
};

export default SubscriptionModal;