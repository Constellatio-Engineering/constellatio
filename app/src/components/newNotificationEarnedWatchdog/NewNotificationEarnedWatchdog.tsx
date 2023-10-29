import BadgeImage from "@/components/badgeImage/BadgeImage";
import { Modal } from "@/components/molecules/Modal/Modal";
import { type BadgeWithUserData } from "@/db/schema";
import useBadges from "@/hooks/useBadges";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { usePrevious } from "@/hooks/usePrevious";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { api } from "@/utils/api";

import { useLocalStorage } from "@mantine/hooks";
import { useSession } from "@supabase/auth-helpers-react";
import React, { type FunctionComponent } from "react";
import { z } from "zod";

import * as styles from "./NewNotificationEarnedWatchdog.styles";

/*
 * The dismissed badges are stored in localStorage in case an error occurs
 * while marking a badge as seen which would result in the modal being not closable
 */
const NewNotificationEarnedWatchdog: FunctionComponent = () =>
{
  const session = useSession();
  const apiUtils = api.useUtils();
  const { invalidateBadges } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { getBadgesResult: { badges } } = useBadges({ disabled: session == null });
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

  return (
    <>
      <Modal
        opened={newEarnedBadges.length > 0}
        onClose={() =>
        {
          if(currentBadge)
          {
            markBadgeAsSeen({ badgeId: currentBadge.id });
          }
        }}
        withCloseButton
        centered>
        {renderedBadge && (
          <div css={styles.contentWrapper}>
            <h1 style={{ fontSize: 26 }}>Neue Errungenschaft</h1>
            <div css={styles.imageWrapper}>
              <BadgeImage filename={renderedBadge.imageFilename} css={styles.image}/>
            </div>
            <h2 style={{ fontSize: 20 }}>{renderedBadge.name}</h2>
            <p>{renderedBadge.description}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default NewNotificationEarnedWatchdog;
