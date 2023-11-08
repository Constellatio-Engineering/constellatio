import { Bookmark } from "@/components/Icons/Bookmark";
import { BookmarkFilledIcon } from "@/components/Icons/BookmarkFilledIcon";
import TableIconButton from "@/components/molecules/tableIconButton/TableIconButton";
import useAddBookmark from "@/hooks/useAddBookmark";
import useRemoveBookmark from "@/hooks/useRemoveBookmark";
import { type AddOrRemoveBookmarkSchema } from "@/schemas/bookmarks/addOrRemoveBookmark.schema";
import { paths } from "@/utils/paths";
import { type Nullable } from "@/utils/types";

import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";

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
  const router = useRouter();
  const mustConfirmDeletion = router.pathname.startsWith(paths.personalSpace) || router.pathname.startsWith(paths.dashboard);
  const [showDeleteBookmarkModal, setShowDeleteBookmarkModal] = React.useState<boolean>(false);
  const { isLoading: isAddingBookmarkLoading, mutate: addBookmark } = useAddBookmark();
  const {
    isLoading: isRemovingBookmarkLoading,
    mutate: removeBookmark
  } = useRemoveBookmark({ shouldUseOptimisticUpdate: !mustConfirmDeletion });

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

    if(mustConfirmDeletion)
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
        dontUseDisabledStyles
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
