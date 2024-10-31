import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import { OverlayLines } from "@/components/Icons/bg-layer";
import * as overviewHeaderStyles from "@/components/organisms/OverviewHeader/OverviewHeader.styles";
import { useForumPageStore } from "@/stores/forumPage.store";

import { Title } from "@mantine/core";
import Image from "next/image";
import { type FunctionComponent } from "react";

import FlagImage from "./assets/flag.png";
import * as styles from "./ForumHeader.styles";

const ForumHeader: FunctionComponent = () =>
{
  const setCreateQuestionState = useForumPageStore((state) => state.setCreateQuestionState);
  const height = 400;
  const variant = "forum";

  return (
    <div css={overviewHeaderStyles.contentHeader({ height, variant })} className="header">
      <div id="overlay-lines">
        <OverlayLines/>
      </div>
      <div css={styles.imagesWrapper}>
        <Image
          css={styles.flag1}
          src={FlagImage}
          alt="Flaggen Icon"
        />
        <Image
          css={styles.flag2}
          src={FlagImage}
          alt="Flaggen Icon"
        />
      </div>
      <ContentWrapper stylesOverrides={styles.contentWrapper}>
        <Title order={1} css={overviewHeaderStyles.title({ variant })}>Forum</Title>
        <BodyText styleType="body-01-regular" css={styles.text}>
          Willkommen im Constellatio Forum! Hier hilft dir die Community zu allen Fragen und Unklarheiten weiter.
          Außerdem kannst du selbst Antworten geben und für dich relevante Fragen upvoten.
          Erfahrene Volljuristen moderieren das Forum und stellen sicher, dass alle Inhalte korrekt sind.
        </BodyText>
        <Button<"button">
          styleType="primary"
          css={styles.button}
          type="button"
          onClick={setCreateQuestionState}>
          Frage stellen
        </Button>
      </ContentWrapper>
    </div>
  );
};

export default ForumHeader;
