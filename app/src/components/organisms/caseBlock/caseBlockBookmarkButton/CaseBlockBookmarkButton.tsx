import { Bookmark } from "@/components/Icons/Bookmark";
import { BookmarkFilledIcon } from "@/components/Icons/BookmarkFilledIcon";
import TableIconButton from "@/components/molecules/tableIconButton/TableIconButton";
import useAddBookmark from "@/hooks/useAddBookmark";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import useRemoveBookmark from "@/hooks/useRemoveBookmark";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
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
  const [showDeleteBookmarkModal, setShowDeleteBookmarkModal] = React.useState<boolean>(false);
  const { isLoading: isAddingBookmarkLoading, mutate: addBookmark } = useAddBookmark();
  const { isLoading: isRemovingBookmarkLoading, mutate: removeBookmark } = useRemoveBookmark();

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
