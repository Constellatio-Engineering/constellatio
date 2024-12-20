import { Bookmark } from "@/components/Icons/Bookmark";
import { BookmarkFilledIcon } from "@/components/Icons/BookmarkFilledIcon";
import TableIconButton from "@/components/molecules/tableIconButton/TableIconButton";
import useAddBookmark from "@/hooks/useAddBookmark";
import useRemoveBookmark from "@/hooks/useRemoveBookmark";

import { type AddOrRemoveBookmarkSchema } from "@constellatio/schemas/routers/bookmarks/addOrRemoveBookmark.schema";
import { appPaths } from "@constellatio/shared/paths";
import { type Nullable } from "@constellatio/utility-types";
import { useRouter } from "next/router";
import { type FunctionComponent, useState } from "react";

import DeleteBookmarkModal from "../../deleteBookmarkModal/DeleteBookmarkModal";
import { type ICaseBlockProps } from "../ItemBlock";

interface Props
{
  readonly areAllBookmarksLoading: boolean;
  readonly isBookmarked: boolean;
  readonly resourceId: Nullable<string>;
  readonly variant: ICaseBlockProps["variant"] | "forumQuestion";
}

const BookmarkButton: FunctionComponent<Props> = ({
  areAllBookmarksLoading,
  isBookmarked,
  resourceId,
  variant
}) =>
{
  const router = useRouter();
  const mustConfirmDeletion = router.pathname.startsWith(appPaths.personalSpace) || router.pathname.startsWith(appPaths.dashboard);
  const [showDeleteBookmarkModal, setShowDeleteBookmarkModal] = useState<boolean>(false);
  const { isPending: isAddingBookmarkLoading, mutate: addBookmark } = useAddBookmark();
  const {
    isPending: isRemovingBookmarkLoading,
    mutate: removeBookmark
  } = useRemoveBookmark({ shouldUseOptimisticUpdate: !mustConfirmDeletion });

  const addOrRemoveBookmark = (action: "add" | "remove"): void =>
  {
    if(!resourceId)
    {
      return;
    }

    const bookmarkData: AddOrRemoveBookmarkSchema = {
      resourceId,
      resourceType: variant === "case" ? "case" : variant === "dictionary" ? "article" : "forumQuestion"
    };

    if(action === "add")
    {
      addBookmark(bookmarkData);
    }
    else
    {
      removeBookmark(bookmarkData);
    }
  };

  const onBookmarkIconClick = (e: React.MouseEvent<HTMLButtonElement>): void =>
  {
    e.stopPropagation();
    e.preventDefault();

    if(!isBookmarked)
    {
      addOrRemoveBookmark("add");
      return;
    }

    if(mustConfirmDeletion)
    {
      setShowDeleteBookmarkModal(true);
    }
    else
    {
      addOrRemoveBookmark("remove");
    }
  };

  return (
    <>
      <TableIconButton
        icon={isBookmarked ? <BookmarkFilledIcon/> : <Bookmark/>}
        isLoading={areAllBookmarksLoading}
        dontUseDisabledStyles
        disabled={areAllBookmarksLoading || isAddingBookmarkLoading || isRemovingBookmarkLoading}
        onClickHandler={onBookmarkIconClick}
      />
      <DeleteBookmarkModal
        onClose={() => setShowDeleteBookmarkModal(false)}
        opened={showDeleteBookmarkModal}
        onSubmit={() =>
        {
          setShowDeleteBookmarkModal(false);
          addOrRemoveBookmark("remove");
        }}
      />
    </>
  );
};

export default BookmarkButton;
