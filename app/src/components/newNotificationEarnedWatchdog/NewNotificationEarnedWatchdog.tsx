import BadgeImage from "@/components/badgeImage/BadgeImage";
import { type BadgeWithUserData } from "@/db/schema";
import useBadges from "@/hooks/useBadges";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { usePrevious } from "@/hooks/usePrevious";
import { AuthStateContext } from "@/provider/AuthStateProvider";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { api } from "@/utils/api";
import { type Path } from "@/utils/paths";

import { Modal, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import React, { type FunctionComponent, useContext, useMemo } from "react";
import { z } from "zod";

import * as styles from "./NewNotificationEarnedWatchdog.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import { Cross } from "../Icons/Cross";

const disabledForPaths: Path[] = [
  "/confirm",
  "/paymentSuccess",
  "/confirm-email-change",
  "/recover",
  "/register",
  "/login",
];

/*
 * The dismissed badges are stored in localStorage in case an error occurs
 * while marking a badge as seen which would result in the modal being not closable
 */
const NewNotificationEarnedWatchdog: FunctionComponent = () =>
{
  const { isUserLoggedIn } = useContext(AuthStateContext);
  const apiUtils = api.useUtils();
  const router = useRouter();
  const isDisabledForCurrentPath = useMemo(
    () => disabledForPaths.some((path) => router.pathname.startsWith(path)),
    [router.pathname]
  );
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

  return (
    <>
      <Modal
        withCloseButton={false}
        lockScroll={false}
        opened={newEarnedBadges.length > 0 && !isDisabledForCurrentPath}
        size="lg"
        radius="12px"
        styles={styles.newEarnedModalStyle()}
        onClose={onClose}
        centered>
        <div css={styles.customModalHeader}>
          <Title order={2}>Neue Errungenschaft</Title>
          <span onClick={onClose}><Cross size={32}/></span>
        </div>
        {renderedBadge && (
          <div css={styles.contentWrapper}>
            <div css={styles.imageWrapper}>
              <BadgeImage filename={renderedBadge.imageFilename} css={styles.image}/>
            </div>
            <BodyText
              styleType="body-01-bold"
              style={{ fontSize: 20, margin: "12px 0 10px" }}
              component="h2">
              {renderedBadge.name}
            </BodyText>
            <BodyText
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
