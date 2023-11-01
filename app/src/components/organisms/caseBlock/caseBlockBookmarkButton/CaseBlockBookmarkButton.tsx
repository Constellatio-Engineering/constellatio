import { Bookmark } from "@/components/Icons/Bookmark";
import { BookmarkFilledIcon } from "@/components/Icons/BookmarkFilledIcon";
import TableIconButton from "@/components/molecules/tableIconButton/TableIconButton";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type AddOrRemoveBookmarkSchema } from "@/schemas/bookmarks/addOrRemoveBookmark.schema";
import { api } from "@/utils/api";
import { paths } from "@/utils/paths";
import { type Nullable } from "@/utils/types";

import { useRouter } from "next/router";
import React, { type FunctionComponent, useRef } from "react";

import DeleteBookmarkModal from "../../deleteBookmarkModal/DeleteBookmarkModal";
import { type ICaseBlockProps } from "../ItemBlock";

interface ICaseBlockBookmarkButtonProps
{
  readonly areAllBookmarksLoading: boolean;
  readonly caseId: Nullable<string>;
  readonly isBookmarked: boolean;
  readonly variant: ICaseBlockProps["variant"];
}

const CaseBlockBookmarkButton: FunctionComponent<ICaseBlockBookmarkButtonProps> = ({
  areAllBookmarksLoading,
  caseId,
  isBookmarked,
  variant
}) =>
{
  const { invalidateBookmarks } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const router = useRouter();
  const [showDeleteBookmarkModal, setShowDeleteBookmarkModal] = React.useState<boolean>(false);
  const addBookmarkMutationStartTimestamp = useRef<number>();
  
  /**
   * Could add optimistic updates here later
   */

  const onError = (e: unknown, type: "add" | "remove"): void =>
  {
    console.log(`error while ${type === "add" ? "adding" : "removing"} bookmark:`, e);
  };

  const { isLoading: isAddingBookmarkLoading, mutate: addBookmark } = api.bookmarks.addBookmark.useMutation({
    onError: e => onError(e, "add"),
    onMutate: () =>
    {
      addBookmarkMutationStartTimestamp.current = performance.now();
    },
    onSettled: () =>
    {
      if(!addBookmarkMutationStartTimestamp.current)
      {
        return;
      }

      const duration = performance.now() - addBookmarkMutationStartTimestamp.current;
      console.log(`add bookmark mutation took ${duration}ms`);
    },
    onSuccess: invalidateBookmarks
  });

  const { isLoading: isRemovingBookmarkLoading, mutate: removeBookmark } = api.bookmarks.removeBookmark.useMutation({
    onError: e => onError(e, "remove"),
    onSuccess: invalidateBookmarks,
  });

  const onBookmarkIconClick = (): void =>
  {
    if(!caseId)
    {
      return;
    }

    const bookmarkData: AddOrRemoveBookmarkSchema = {
      resourceId: caseId,
      resourceType: variant === "case" ? "case" : "article"
    };

    if(!isBookmarked)
    {
      addBookmark(bookmarkData);
      return;
    }

    if(router?.route === paths.personalSpace || router?.route === paths.dashboard)
    {
      setShowDeleteBookmarkModal(true);
    }
    else
    {
      removeBookmark(bookmarkData);
    }
  };

  return (
    <>
      <TableIconButton
        icon={isBookmarked ? <BookmarkFilledIcon/> : <Bookmark/>}
        isLoading={areAllBookmarksLoading}
        disabled={areAllBookmarksLoading || isAddingBookmarkLoading || isRemovingBookmarkLoading}
        onClickHandler={onBookmarkIconClick}
      />
      <DeleteBookmarkModal
        onClose={function(): void 
        {
          setShowDeleteBookmarkModal(false);
        }}
        opened={showDeleteBookmarkModal}
        onSubmit={
          function(): void 
          {
            if(caseId)
            {
              const bookmarkData: AddOrRemoveBookmarkSchema = {
                resourceId: caseId,
                resourceType: variant === "case" ? "case" : "article"
              };
              removeBookmark(bookmarkData);
            }
            setShowDeleteBookmarkModal(false);
          }
        }
      />
    </>
  );
};

export default CaseBlockBookmarkButton;
