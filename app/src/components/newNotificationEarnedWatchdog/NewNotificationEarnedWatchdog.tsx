import BadgeImage from "@/components/badgeImage/BadgeImage";
import { Modal } from "@/components/molecules/Modal/Modal";
import useBadges from "@/hooks/useBadges";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { api } from "@/utils/api";

import { useLocalStorage } from "@mantine/hooks";
import React, { type FunctionComponent } from "react";
import { z } from "zod";

import * as styles from "./NewNotificationEarnedWatchdog.styles";

/*
 * The dismissed badges are stored in localStorage in case an error occurs
 * while marking a badge as seen which would result in the modal being not closable
 */
const NewNotificationEarnedWatchdog: FunctionComponent = () =>
{
  const { invalidateBadges } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { getBadgesResult: { badges } } = useBadges();
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
    onError: (error) => console.log(error),
    onSuccess: invalidateBadges,
  });

  const newEarnedBadges = badges
    .filter(({ isCompleted, wasSeen }) => isCompleted && !wasSeen)
    .filter(({ id }) => !dismissedBadges.includes(id));
  const currentBadge = newEarnedBadges[0];

  return (
    <>
      <Modal
        opened={newEarnedBadges.length > 0}
        onClose={() =>
        {
          if(currentBadge)
          {
            setDismissedBadges((dismissedBadges) => [...dismissedBadges, currentBadge.id]);
            markBadgeAsSeen({ badgeId: currentBadge.id });
          }
        }}
        withCloseButton
        centered>
        {currentBadge && (
          <div css={styles.contentWrapper}>
            <h1 style={{ fontSize: 26 }}>Neue Errungenschaft</h1>
            <div css={styles.imageWrapper}>
              <BadgeImage filename={currentBadge.imageFilename} css={styles.image}/>
            </div>
            <h2 style={{ fontSize: 20 }}>{currentBadge.name}</h2>
            <p>{currentBadge.description}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default NewNotificationEarnedWatchdog;
