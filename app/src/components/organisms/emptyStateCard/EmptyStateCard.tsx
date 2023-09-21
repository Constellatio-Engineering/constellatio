import CaisyImg from "@/basic-components/CaisyImg";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";

import { Title, useMantineTheme } from "@mantine/core";
import React, { type ReactNode, type FunctionComponent } from "react";

import * as styles from "./EmptyStateCard.styles";
import placeHolderFlagImg from "../../../../public/images/placeholder-flag.png";

export interface IEmptyStateCardProps 
{
  readonly button?: ReactNode;
  readonly hideIcon?: boolean;
  readonly text: string;
  readonly title: string;
  readonly variant?: "For-small-areas" | "For-large-areas";
}

const EmptyStateCard: FunctionComponent<IEmptyStateCardProps> = ({
  button,
  hideIcon = false,
  text,
  title,
  variant = "For-large-areas"
}) => 
{
  const theme = useMantineTheme();
  return (
    <div css={styles.wrapper}>
      <div css={styles.emptyStateCard({ theme, variant })}>
        {!hideIcon && (
          <div css={styles.emptyStateCardImage({ variant })}>
            <CaisyImg src={placeHolderFlagImg.src} description="empty card img"/>
          </div>
        )}
        <div css={styles.emptyStateCardTitle}>
          <Title order={3}>
            {title}
          </Title>
        </div>
        <div css={styles.emptyStateCardText({ theme })}>
          <BodyText styleType="body-01-medium">
            {text}
          </BodyText>
        </div>
        {button && variant === "For-large-areas" && (
          <div css={styles.callToAction({ theme })}>
            <Button<"button"> styleType="primary" onClick={() => {}}>
              {button}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyStateCard;
