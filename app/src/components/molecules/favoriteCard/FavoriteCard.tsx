import Label from "@/components/atoms/label/Label";
import BookmarkButton from "@/components/organisms/caseBlock/BookmarkButton/BookmarkButton";
import useBookmarks from "@/hooks/useBookmarks";

import { Skeleton, Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./FavoriteCard.styles";

type LoadingProps = {
  readonly isLoading: true;
};

type LoadedProps = React.HTMLAttributes<HTMLDivElement> & {
  readonly icon?: React.ReactNode;
  readonly isLoading: false;
  readonly resourceId: string;
  readonly title: string;
  readonly variant: "case" | "dictionary";
};

type Props = LoadingProps | LoadedProps;

const FavoriteCard: FunctionComponent<Props> = (props) =>
{
  const { bookmarks, isLoading: areAllBookmarksLoading } = useBookmarks(undefined);

  // eslint-disable-next-line react/destructuring-assignment
  if(props.isLoading)
  {
    return (
      <div css={[styles.wrapper, styles.wrapperLoading]}>
        <Skeleton width="100%" height="100%"/>
      </div>
    );
  }

  const {
    isLoading,
    resourceId,
    title,
    variant,
    ...rest
  } = props;

  const numberOfLetters: number = 45;
  return (
    <div css={[styles.wrapper, styles.wrapperLoaded]} {...rest}>
      <div css={styles.tags}>
        <Label variant={variant} title={variant === "case" ? "Fälle" : "Lexikon"}/>
        <BookmarkButton
          isBookmarked={bookmarks.find(b => b.resourceId === resourceId) != null}
          areAllBookmarksLoading={areAllBookmarksLoading}
          resourceId={resourceId}
          variant={variant}
        />
      </div>
      {title && (
        <Title title={title} order={4} css={styles.title}>
          {title.slice(0, numberOfLetters)}{title?.length > numberOfLetters && "..."}
        </Title>
      )}
    </div>
  );
};

export default FavoriteCard;
