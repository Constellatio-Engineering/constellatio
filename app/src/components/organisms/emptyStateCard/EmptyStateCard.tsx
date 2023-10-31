import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";
import { EmptyStateCardIcon } from "@/components/Icons/EmptyStateCardIcon";

import { Title, useMantineTheme } from "@mantine/core";
import React, { type ReactNode, type FunctionComponent } from "react";

import * as styles from "./EmptyStateCard.styles";

export interface IEmptyStateCardProps 
{
  readonly button?: ReactNode;
  readonly click?: () => void;
  readonly hideIcon?: boolean;
  readonly text: string;
  readonly title: string;
  readonly variant?: "For-small-areas" | "For-large-areas";
}

const EmptyStateCard: FunctionComponent<IEmptyStateCardProps> = ({
  button,
  click = () => {},
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
            <EmptyStateCardIcon/>
          </div>
        )}
        <div css={styles.emptyStateCardTitle({ theme, variant })}>
          {variant === "For-large-areas" ? (
            <Title order={3}>
              {title}
            </Title>
          ) : <SubtitleText styleType="subtitle-01-medium">{title}</SubtitleText>}
        </div>
        <div css={styles.emptyStateCardText({ theme })}>
          {variant === "For-large-areas" ? (
            <BodyText styleType="body-01-medium">
              {text}
            </BodyText>
          ) : <SubtitleText styleType="subtitle-01-medium">{text}</SubtitleText>}
        </div>
        {button && variant === "For-large-areas" && (
          <div css={styles.callToAction({ theme })}>
            <Button<"button"> styleType="primary" onClick={click}>
              {button}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyStateCard;
