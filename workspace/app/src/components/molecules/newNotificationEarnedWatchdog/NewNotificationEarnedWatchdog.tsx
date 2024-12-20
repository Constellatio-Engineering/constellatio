import BadgeImage from "@/components/atoms/badgeImage/BadgeImage";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Cross } from "@/components/Icons/Cross";
import useBadges from "@/hooks/useBadges";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import useOnboardingResult from "@/hooks/useOnboardingResult";
import { usePrevious } from "@/hooks/usePrevious";
import { supabase } from "@/lib/supabase";
import { AuthStateContext } from "@/provider/AuthStateProvider";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { api } from "@/utils/api";

import { type BadgeWithUserData } from "@constellatio/db/schema";
import { getIsPathAppPath } from "@constellatio/shared/paths";
import { Modal, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { type FunctionComponent, useContext, useEffect } from "react";
import { z } from "zod";

import * as styles from "./NewNotificationEarnedWatchdog.styles";

/*
 * The dismissed badges are stored in localStorage in case an error occurs
 * while marking a badge as seen which would result in the modal being not closable
 */
const NewNotificationEarnedWatchdog: FunctionComponent = () =>
{
  const { isUserLoggedIn } = useContext(AuthStateContext);
  const apiUtils = api.useUtils();
  const { pathname } = useRouter();
  const isEnabledForCurrentPath = getIsPathAppPath(pathname);
  const { invalidateBadges } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { getBadgesResult: { badges } } = useBadges({ disabled: !isUserLoggedIn });
  const [dismissedBadges, setDismissedBadges] = useLocalStorage<string[]>({
    defaultValue: [],
    deserialize: (localStorageValue) => 
    {
      let dismissedBadges: string[];

      try
      {
        const parsedValue = JSON.parse(localStorageValue);
        dismissedBadges = z.string().array().parse(parsedValue);
      }
      catch (e: unknown)
      {
        localStorage.setItem("dismissedBadges", JSON.stringify([]));
        dismissedBadges = [];
      }

      return dismissedBadges;
    },
    key: "dismissedBadges",
    serialize: (value) => JSON.stringify(value),
  });

  const { mutate: markBadgeAsSeen } = api.badges.markBadgeAsSeen.useMutation({
    onError: (_err, variables) =>
    {
      // If an error occurs while marking a badge as seen, we add it to the dismissed badges so the modal can be closed anyway
      setDismissedBadges((dismissedBadges) => [...dismissedBadges, variables.badgeId]);
    },
    onMutate: async ({ badgeId }) =>
    {
      // cancel outstanding getBadges request
      await apiUtils.badges.getBadges.cancel();

      // Get the data from the queryCache
      const prevData = apiUtils.badges.getBadges.getData();

      // Optimistically update the data to display the badge as seen
      apiUtils.badges.getBadges.setData(undefined, (getBadgesResult) =>
      {
        const newBadges = [...(getBadgesResult?.badges ?? [])];
        const badgeIndex = newBadges.findIndex(({ id }) => id === badgeId);

        if(badgeIndex !== -1)
        {
          newBadges[badgeIndex]!.wasSeen = true;
        }

        return ({
          badges: newBadges,
          completedCount: prevData?.completedCount ?? 0,
          totalCount: prevData?.totalCount ?? 0
        });
      });
    },
    onSettled: invalidateBadges,
  });

  useEffect(() =>
  {
    const channel = supabase
      .channel("realtime badges")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "User_to_Badge", },
        (_payload) => void invalidateBadges()
      )
      .subscribe();

    return () => void supabase.removeChannel(channel);
  }, [invalidateBadges]);

  const newEarnedBadges = badges
    .filter(badge => badge.isCompleted && !badge.wasSeen)
    .filter(({ id }) => !dismissedBadges.includes(id));
  const currentBadge = newEarnedBadges[0];
  const previousBadge = usePrevious(currentBadge);

  // It the last badge was dismissed, show it until the modal is closed, otherwise the closing animation would look weird
  let renderedBadge: BadgeWithUserData | undefined;

  if(currentBadge)
  {
    renderedBadge = currentBadge;
  }
  else if(previousBadge && !currentBadge)
  {
    renderedBadge = previousBadge;
  }

  const onClose = (): void =>
  {
    if(currentBadge)
    {
      markBadgeAsSeen({ badgeId: currentBadge.id });
    }
  };

  const { data: onboardingResult } = useOnboardingResult();

  return (
    <>
      <Modal
        withCloseButton={false}
        lockScroll={false}
        opened={newEarnedBadges.length > 0 && isEnabledForCurrentPath && (onboardingResult != null)}
        size="lg"
        radius="12px"
        styles={styles.newEarnedModalStyle()}
        onClose={onClose}
        centered>
        <div css={styles.customModalHeader}>
          <Title order={2}>Neues Badge</Title>
          <span onClick={onClose}><Cross size={32}/></span>
        </div>
        {renderedBadge && (
          <div css={styles.contentWrapper}>
            <div css={styles.imageWrapper}>
              <BadgeImage filename={renderedBadge.imageFilename} css={styles.image}/>
            </div>
            <BodyText
              styleType="body-01-bold"
              style={{ fontSize: 20, margin: "12px 0 10px", textAlign: "center" }}
              component="h2">
              {renderedBadge.name}
            </BodyText>
            <BodyText
              ta="center"
              styleType="body-01-regular"
              style={{ marginBottom: 10 }}
              component="h2">
              {renderedBadge.description}
            </BodyText>
          </div>
        )}
      </Modal>
    </>
  );
};

export default NewNotificationEarnedWatchdog;
