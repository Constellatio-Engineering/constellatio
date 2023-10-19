import IconButton from "@/components/atoms/iconButton/IconButton";
import Label from "@/components/atoms/label/Label";
import { BookmarkFilledIcon } from "@/components/Icons/BookmarkFilledIcon";

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
  title,
  variant,
  ...props
}) => 
{
  return (
    <div css={styles.wrapper} {...props}>
      <div css={styles.tags}>
        <Label variant={variant} title={variant === "case" ? "Fälle" : "Lexikon"}/>
        <IconButton icon={icon ?? <BookmarkFilledIcon/>} size="big"/>
      </div>
      {title && <Title title={title} order={4} css={styles.title}>{title.slice(0, 40)}{title?.length > 45 && "..."}</Title>}
    </div>
  );
};

export default FavoriteCard;
