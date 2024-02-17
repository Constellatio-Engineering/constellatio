import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { OverlayLines } from "@/components/Icons/bg-layer";
import * as overviewHeaderStyles from "@/components/organisms/OverviewHeader/OverviewHeader.styles";
import { useForumPageStore } from "@/stores/forumPage.store";

import { Title, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import React, { type FunctionComponent } from "react";

import FlagImage from "./assets/flag.png";
import * as styles from "./ForumHeader.styles";

const ForumHeader: FunctionComponent = () =>
{
  const setCreateQuestionState = useForumPageStore((state) => state.setCreateQuestionState);
  const theme = useMantineTheme();
  const height = 500;
  const variant = "forum";

  return (
    <div css={overviewHeaderStyles.contentHeader({ height, theme, variant })} className="header">
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
      <div css={styles.contentWrapper}>
        <Title order={1} css={overviewHeaderStyles.title({ theme, variant })}>Forum</Title>
        <BodyText styleType="body-01-regular" css={styles.text}>
          Welcome to our community! Join us to engage in insightful discussions, share your thoughts, and seek answers to your
          questions
        </BodyText>
        <Button<"button">
          styleType="primary"
          css={styles.button}
          type="button"
          onClick={setCreateQuestionState}>
          Ask a question
        </Button>
      </div>
    </div>
  );
};

export default ForumHeader;
