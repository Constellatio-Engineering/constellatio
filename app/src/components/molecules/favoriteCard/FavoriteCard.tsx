import Label from "@/components/atoms/label/Label";

import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./FavoriteCard.styles";

interface FavoriteCardProps extends React.HTMLAttributes<HTMLDivElement>  
{
  readonly icon?: React.ReactNode;
  readonly title: string;
  readonly variant: "case" | "dictionary";
}

const FavoriteCard: FunctionComponent<FavoriteCardProps> = ({
  icon,
  id: caseId,
  title,
  variant,
  ...props
}) => 
{
  const numberOfLetters: number = 45;
  return (
    <div css={styles.wrapper} {...props}>
      <div css={styles.tags}>
        <Label variant={variant} title={variant === "case" ? "Fälle" : "Lexikon"}/>
        {/* <IconButton onClick={() => onBookmarkIconClick()} icon={icon ?? <BookmarkFilledIcon/>} size="big"/> */}
      </div>
      {title && <Title title={title} order={4} css={styles.title}>{title.slice(0, numberOfLetters)}{title?.length > numberOfLetters && "..."}</Title>}
    </div>
  );
};

export default FavoriteCard;
