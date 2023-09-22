import { Bookmark } from "@/components/Icons/Bookmark";
import { BookmarkFilledIcon } from "@/components/Icons/BookmarkFilledIcon";
import TableIconButton from "@/components/molecules/tableIconButton/TableIconButton";
import { type AddOrRemoveBookmarkSchema } from "@/schemas/addOrRemoveBookmarkSchema";
import { api } from "@/utils/api";

import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import React, { type FunctionComponent } from "react";

interface ICaseBlockBookmarkButtonProps
{
  readonly areAllBookmarksLoading: boolean;
  readonly caseId: string;
  readonly isBookmarked: boolean;
}

const CaseBlockBookmarkButton: FunctionComponent<ICaseBlockBookmarkButtonProps> = ({ areAllBookmarksLoading, caseId, isBookmarked }) =>
{
  const apiContext = api.useContext();

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
    onSuccess: onBookmarkAddedOrRemoved,
  });

  const { isLoading: isRemovingBookmarkLoading, mutate: removeBookmark } = api.bookmarks.removeBookmark.useMutation({
    onError: e => onError(e, "remove"),
    onSuccess: onBookmarkAddedOrRemoved,
  });

  return (
    <TableIconButton
      icon={isBookmarked ? <BookmarkFilledIcon/> : <Bookmark/>}
      isLoading={areAllBookmarksLoading}
      disabled={areAllBookmarksLoading || isAddingBookmarkLoading || isRemovingBookmarkLoading}
      onClickHandler={() =>
      {
        const bookmarkData: AddOrRemoveBookmarkSchema = {
          resourceId: caseId,
          resourceType: "case"
        };
        if(isBookmarked)
        {
          modals.openConfirmModal({
            centered: true,
            children: (
              <Text size="sm">
                Are you sure you want to delete this case from your favorites?
              </Text>
            ),
            confirmProps: { color: "red" },
            labels: { cancel: "No don't delete it", confirm: "Delete bookmark" },
            onConfirm: () => removeBookmark(bookmarkData),
            title: "Remove from favorites",
          });
        }
        else
        {
          addBookmark(bookmarkData);
        }
      }}
    />
  );
};

export default CaseBlockBookmarkButton;
