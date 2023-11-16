import { Button } from "@/components/atoms/Button/Button";
import { Bookmark } from "@/components/Icons/Bookmark";
import { FileWhiteIcon } from "@/components/Icons/FileWhite";
import FavoriteCard from "@/components/molecules/favoriteCard/FavoriteCard";
import MaterialCard from "@/components/molecules/materialCard/MaterialCard";
import ProfilePersonalSpaceBlockHead from "@/components/molecules/profilePersonalSpaceBlockHead/ProfilePersonalSpaceBlockHead";
import useAllFavorites from "@/hooks/useAllFavorites";
import useUploadedFiles from "@/hooks/useUploadedFiles";
// import useUploadFolders from "@/hooks/useUploadFolders";
import { type IGenArticle, type IGenCase } from "@/services/graphql/__generated/sdk";
import { paths } from "@/utils/paths";

import { Loader } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { type FunctionComponent, useState } from "react";

import * as styles from "./ProfilePersonalSpaceBlock.styles";
import EmptyStateCard from "../emptyStateCard/EmptyStateCard";
import FileViewer from "../fileViewer/FileViewer";

const ProfilePersonalSpaceBlock: FunctionComponent = () => 
{
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { isLoading: isGetUploadedFilesLoading, uploadedFiles } = useUploadedFiles(null);

  const {
    areArticlesLoading,
    bookmarkedArticles,
    bookmarkedCases, 
    favoritesList, 
    isUseBookmarksLoading, 
    isUseCasesLoading
  } = useAllFavorites();

  const favoritesCount = (bookmarkedCases?.length + bookmarkedArticles?.length);
  const uploadedFilesCount = uploadedFiles?.length;

  const tabs = [
    {
      icon: { src: <Bookmark/> }, number: favoritesCount, subtitle: favoritesCount > 1 ? "Favoriten" : "Favorit", title: "Favoriten" 
    }, 
    {
      icon: { src: <FileWhiteIcon/> }, number: uploadedFilesCount, subtitle: uploadedFilesCount > 1 ? "Dateien" : "Datei", title: "Deine Dateien" 
    }
  ];
  return (
    <div css={styles.wrapper}>
      <ProfilePersonalSpaceBlockHead selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs}/>
      {selectedTab === 0 && (
        <div css={styles.favoritesTab}>
          <div css={styles.casesCard}>
            {
              (isUseBookmarksLoading || isUseCasesLoading || areArticlesLoading) ? (<Loader sx={{ margin: "0px" }}/>) :
                favoritesList && 
              favoritesList.length > 0 ? (
                    favoritesList?.sort((a, b) => new Date(b?._meta?.createdAt).getTime() - new Date(a?._meta?.createdAt).getTime())?.slice(0, 6)?.map((bookmarkedItem: IGenCase| IGenArticle, index: number) => (bookmarkedItem?.__typename === "Case") ? (
                      <React.Fragment key={index}>
                        <FavoriteCard
                          onClick={async () => router.push(`/cases/${bookmarkedItem?.id}`)}
                          title={bookmarkedItem.title ?? ""}
                          variant="case"
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={index}>
                        <FavoriteCard
                          onClick={async () => router.push(`/dictionary/${bookmarkedItem?.id}`)}
                          title={bookmarkedItem.title ?? ""}
                          variant="dictionary"
                        />
                      </React.Fragment>
                    ))
                  ) : (
                    <EmptyStateCard 
                      title="Noch keine Favoriten vorhanden"
                      text="Speichere jetzt Fälle oder Lexikonartikel als Favoriten in deinem persönlichen Bereich."
                      variant="For-small-areas"
                    />
                  )
            }
            
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
      {selectedTab === 1 ?
        isGetUploadedFilesLoading ? (<Loader sx={{ margin: "0px" }}/>) :
          (
            <div>
              <div css={styles.uploadedMaterialsTab}>
                {uploadedFilesCount > 0 ? (
                  <>
                    {uploadedFiles.slice(0, 6).map((file, index) => (
                      <MaterialCard
                        title={file?.originalFilename}
                        fileExtension={file?.fileExtension}
                        id={file?.id}
                        materialType="paper"
                        key={index}
                      />
                    ))}
                  </>
                ) : (
                  <EmptyStateCard 
                    title="Du hast noch keine Dateien hochgeladen"
                    text="Du kannst jetzt eigene Dateien hochladen und in deinem persönlichen Bereich ablegen."
                    variant="For-small-areas"
                  />
                )}
              </div>
              {uploadedFilesCount > 6 && (
                <Link href={`${paths.personalSpace}?category=materials`}>
                  <Button<"button"> styleType="secondarySimple">
                    Alle anzeigenl
                  </Button>
                </Link>
              )}
              <FileViewer/>
            </div>
          )
        : null}
    </div>
  );
};

export default ProfilePersonalSpaceBlock;
