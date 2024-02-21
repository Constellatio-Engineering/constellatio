import Label from "@/components/atoms/label/Label";
import BookmarkButton from "@/components/organisms/caseBlock/BookmarkButton/BookmarkButton";
import { type Favorite } from "@/hooks/useAllFavorites";
import useBookmarks from "@/hooks/useBookmarks";

import { Skeleton, Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./FavoriteCard.styles";

type LoadingProps = {
  readonly isLoading: true;
};

type LoadedProps = React.HTMLAttributes<HTMLDivElement> & Omit<Favorite, "createdAt"> & {
  readonly icon?: React.ReactNode;
  readonly isLoading: false;
};

type Props = LoadingProps | LoadedProps;

const FavoriteCard: FunctionComponent<Props> = (props) =>
{
  const { bookmarks, isLoading: areAllBookmarksLoading } = useBookmarks(undefined);

  if(props.isLoading)
  {
    return (
      <div css={[styles.wrapper, styles.wrapperLoading]}>
        <Skeleton width="100%" height="100%"/>
      </div>
    );
  }

  const {
    favoriteType,
    isLoading,
    resourceId,
    title,
    ...rest
  } = props;

  const numberOfLetters: number = 45;

  return (
    <div css={[styles.wrapper, styles.wrapperLoaded]} {...rest}>
      <div css={styles.tags}>
        <Label
          variant={favoriteType === "case" ? "case" : favoriteType === "question" ? "forum" : "dictionary"}
          title={favoriteType === "case" ? "Fälle" : favoriteType === "question" ? "Forum" : "Lexikon"}
        />
        <BookmarkButton
          isBookmarked={bookmarks.find(b => b.resourceId === resourceId) != null}
          areAllBookmarksLoading={areAllBookmarksLoading}
          resourceId={resourceId}
          variant={favoriteType === "case" ? "case" : favoriteType === "question" ? "forumQuestion" : "dictionary"}
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
