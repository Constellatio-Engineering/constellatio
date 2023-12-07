import { Button } from "@/components/atoms/Button/Button";
import { Bookmark } from "@/components/Icons/Bookmark";
import { FileWhiteIcon } from "@/components/Icons/FileWhite";
import ProfilePersonalSpaceBlockHead from "@/components/molecules/profilePersonalSpaceBlockHead/ProfilePersonalSpaceBlockHead";
import FavoritesExcerpt from "@/components/organisms/favoritesExcerpt/FavoritesExcerpt";
import MaterialsExcerpt from "@/components/organisms/materialsExcerpt/MaterialsExcerpt";
import useAllFavorites from "@/hooks/useAllFavorites";
import { useAllUserData } from "@/hooks/useAllUserData";
import useUploadedFiles from "@/hooks/useUploadedFiles";
import { paths } from "@/utils/paths";

import { Loader } from "@mantine/core";
import Link from "next/link";
import React, { type FunctionComponent, useState } from "react";

import * as styles from "./ProfilePersonalSpaceBlock.styles";

const ProfilePersonalSpaceBlock: FunctionComponent = () => 
{
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { isLoading: isGetUploadedFilesLoading, uploadedFilesInAllFolders } = useUploadedFiles();

  const {
    areArticlesLoading,
    bookmarkedArticles,
    bookmarkedCases, 
    favoritesList, 
    isUseBookmarksLoading, 
    isUseCasesLoading
  } = useAllFavorites();

  const favoritesCount = (bookmarkedCases?.length + bookmarkedArticles?.length);
  const uploadedFilesCount = uploadedFilesInAllFolders?.length;
  const { allUserData } = useAllUserData();

  const tabs = [
    {
      icon: { src: <Bookmark/> },
      number: favoritesCount,
      subtitle: favoritesCount > 1 ? "Favoriten" : "Favorit",
      title: "Favoriten"
    }, 
    {
      icon: { src: <FileWhiteIcon/> },
      number: uploadedFilesCount,
      subtitle: uploadedFilesCount > 1 ? "Dateien" : "Datei",
      title: "Deine Dateien"
    }
  ];

  return (
    <div css={styles.wrapper}>
      <ProfilePersonalSpaceBlockHead selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs}/>
      {selectedTab === 0 && (
        <div css={styles.favoritesTab}>
          <div css={styles.casesCard}>
            {(isUseBookmarksLoading || isUseCasesLoading || areArticlesLoading) ? (
              <Loader sx={{ margin: "0px" }}/>
            ) : (
              <FavoritesExcerpt favorites={favoritesList} shouldSortByCreatedAt/>
            )}
          </div>
          {favoritesList && favoritesList?.length > 6 && (
            <Link href={`${paths.personalSpace}?category=favorites`}>
              <Button<"button"> styleType="secondarySimple">
                Alle anzeigen
              </Button>
            </Link>
          )}
        </div>
      )}
      {selectedTab === 1 && (
        <>
          {isGetUploadedFilesLoading ? (
            <Loader sx={{ margin: "0px" }}/>
          ) : (
            <div>
              <div css={styles.uploadedMaterialsTab}>
                <MaterialsExcerpt allUserData={allUserData}/>
              </div>
              {allUserData.length > 6 && (
                <Link href={`${paths.personalSpace}?category=materials`}>
                  <Button<"button"> styleType="secondarySimple">
                    Alle anzeigen
                  </Button>
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePersonalSpaceBlock;
