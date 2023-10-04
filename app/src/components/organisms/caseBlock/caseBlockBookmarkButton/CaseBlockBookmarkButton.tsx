import { Bookmark } from "@/components/Icons/Bookmark";
import { BookmarkFilledIcon } from "@/components/Icons/BookmarkFilledIcon";
import TableIconButton from "@/components/molecules/tableIconButton/TableIconButton";
import { type AddOrRemoveBookmarkSchema } from "@/schemas/bookmarks/addOrRemoveBookmark.schema";
import { api } from "@/utils/api";
import { paths } from "@/utils/paths";
import { type Nullable } from "@/utils/types";

import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import React, { type FunctionComponent, useRef } from "react";

interface ICaseBlockBookmarkButtonProps
{
  readonly areAllBookmarksLoading: boolean;
  readonly caseId: Nullable<string>;
  readonly isBookmarked: boolean;
  readonly variant: "case" | "dictionary";
}

const CaseBlockBookmarkButton: FunctionComponent<ICaseBlockBookmarkButtonProps> = ({
  areAllBookmarksLoading,
  caseId,
  isBookmarked,
  variant
}) =>
{
  const apiContext = api.useContext();
  const router = useRouter();
  const addBookmarkMutationStartTimestamp = useRef<number>();
  
  /**
   * Could add optimistic updates here later
   */

  const onBookmarkAddedOrRemoved = async (): Promise<void> =>
  {
    await apiContext.bookmarks.getAllBookmarks.invalidate();
  };

  const onError = (e: unknown, type: "add" | "remove"): void =>
  {
    console.log(`error while ${type === "add" ? "adding" : "removing"} bookmark:`, e);

    notifications.show({
      message: `Bookmark couldn't be ${type === "add" ? "added" : "removed"}`,
      title: "Oops!",
    });
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
    onSuccess: onBookmarkAddedOrRemoved
  });

  const { isLoading: isRemovingBookmarkLoading, mutate: removeBookmark } = api.bookmarks.removeBookmark.useMutation({
    onError: e => onError(e, "remove"),
    onSuccess: onBookmarkAddedOrRemoved,
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

    if(router?.route === paths.personalSpace)
    {
      modals.openConfirmModal({
        centered: true,
        children: <Text size="sm">Are you sure you want to delete this case from your favorites?</Text>,
        confirmProps: { color: "red" },
        labels: { cancel: "No don't delete it", confirm: "Delete bookmark" },
        onConfirm: () => removeBookmark(bookmarkData),
        title: "Remove from favorites",
      });
    }
    else
    {
      removeBookmark(bookmarkData);
    }
  };

  return (
    <TableIconButton
      icon={isBookmarked ? <BookmarkFilledIcon/> : <Bookmark/>}
      isLoading={areAllBookmarksLoading}
      disabled={areAllBookmarksLoading || isAddingBookmarkLoading || isRemovingBookmarkLoading}
      onClickHandler={onBookmarkIconClick}
    />
  );
};

export default CaseBlockBookmarkButton;
