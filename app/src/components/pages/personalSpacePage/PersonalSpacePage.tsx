import OverviewHeader, { slugFormatter } from "@/components/organisms/OverviewHeader/OverviewHeader";
import PersonalSpaceFavoriteTab from "@/components/organisms/personalSpaceFavoriteTab/PersonalSpaceFavoriteTab";
import PersonalSpaceMaterialsTab from "@/components/organisms/personalSpaceMaterialsTab/PersonalSpaceMaterialsTab";
import useArticles from "@/hooks/useArticles";
import useBookmarks from "@/hooks/useBookmarks";
import useCases from "@/hooks/useCases";
import useDocuments from "@/hooks/useDocuments";
import useUploadedFiles from "@/hooks/useUploadedFiles";
import { type IGenArticle } from "@/services/graphql/__generated/sdk";
import useMaterialsStore from "@/stores/materials.store";

import { useRouter } from "next/router";
import { useQueryState } from "next-usequerystate";
import React, { type FunctionComponent, useId } from "react";

import { categoriesHelper } from "./PersonalSpaceHelper";
import * as styles from "./PersonalSpacePage.styles";
import BookmarkIconSvg from "../../../../public/images/icons/bookmark.svg";
import FileIconSvg from "../../../../public/images/icons/file.svg";

export type FileWithClientSideUuid = {
  clientSideUuid: string;
  file: File;
};

const PersonalSpacePage: FunctionComponent = () =>
{
  // const { folders = [] } = useUploadFolders();
  const { allCases = [] } = useCases();
  const { allArticles = [] } = useArticles(); 
  const { bookmarks } = useBookmarks(undefined);
  const selectedFolderId = useMaterialsStore(s => s.selectedFolderId);
  const { documents } = useDocuments(selectedFolderId);
  const { uploadedFiles } = useUploadedFiles(selectedFolderId);

  // const allItemsInMaterialsTab = [];
  // for(const folder of folders)
  // {
  //   const { documents } = useDocuments(folder.id);
  //   allItemsInMaterialsTab.push(...documents);
  // }

  const allCasesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "case") ?? [];
  const bookmarkedCases = allCases.filter(caisyCase => allCasesBookmarks.some(bookmark => bookmark.resourceId === caisyCase.id));
  const allArticlesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "article") ?? [];
  const bookmarkedArticles = allArticles.filter((caisyArticle: IGenArticle) => allArticlesBookmarks.some(bookmark => bookmark.resourceId === caisyArticle.id));
  const FavCategoryId = useId();
  const MaterialsCategoryId = useId();
  const categories = categoriesHelper({
    BookmarkIconSvg,
    FavCategoryId,
    bookmarkedCasesLength: (bookmarkedCases?.length + bookmarkedArticles?.length) ?? 0
  }, {
    FileIconSvg,
    MaterialsCategoryId,
    uploadedFilesLength: (uploadedFiles?.length + documents?.length) ?? 0,
  });
  // const [selectedCategory, setSelectedCategory] = useState<IGenMainCategory | undefined>(categories?.[0]);
  const isFavoriteTab = (slug: string): boolean => slug === slugFormatter(categories?.[0]?.mainCategory ?? "");
  const router = useRouter();
  const [selectedCategorySlug, setSelectedCategorySlug] = useQueryState("category");
  React.useEffect(() => 
  {
    if(typeof window !== "undefined") 
    {
      void (async () => 
      {
        try 
        {
          if(!selectedCategorySlug) 
          {
            await setSelectedCategorySlug(
              slugFormatter(categories?.[0]?.mainCategory ?? "")
            );
            await router.replace({
              query: {
                ...router.query,
                category: slugFormatter(
                  categories?.[0]?.mainCategory ?? ""
                ),
              },
            });
          }
        }
        catch (error) 
        {
          console.error(error);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.category, setSelectedCategorySlug]);

  return (
    <div css={styles.wrapper}>
      {
        router.query.category && (
          <>
            <div css={styles.header}>
              <OverviewHeader
                title="Personal Space"
                variant="red"
                categories={categories}
                selectedCategorySlug={selectedCategorySlug}
                setSelectedCategorySlug={setSelectedCategorySlug}
              />
            </div>
            {isFavoriteTab(selectedCategorySlug ?? "") ?
              <PersonalSpaceFavoriteTab/>
              : 
              <PersonalSpaceMaterialsTab/>}
          </>
        )
      }
    </div>
  );
};
export default PersonalSpacePage;
