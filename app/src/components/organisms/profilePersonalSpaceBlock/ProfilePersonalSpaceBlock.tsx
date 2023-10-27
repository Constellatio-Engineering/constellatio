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
  const tabs = [
    { icon: { src: <Bookmark/> }, number: (bookmarkedCases?.length + bookmarkedArticles?.length) ?? 0, title: "favorites" }, 
    { icon: { src: <FileWhiteIcon/> }, number: uploadedFiles?.length, title: " materials" }
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
                      title="You haven not saved any materials yet"
                      text="You can save cases, dictionary articles, forum questions and highlighted text to Favourites"
                      variant="For-small-areas"
                    />
                  )
            }
            
          </div>
          {favoritesList && favoritesList?.length > 6 && (
            <Link href={`${paths.personalSpace}?category=favourites`}>
              <Button<"button"> styleType="secondarySimple">
                View all
              </Button>
            </Link>
          )}
        </div>
      )}
      {
      
        selectedTab === 1 ? 
          isGetUploadedFilesLoading ? (<Loader sx={{ margin: "0px" }}/>) :
            (
              <div>
                <div css={styles.uploadedMaterialsTab}>
                  {uploadedFiles.slice(0, 6).map((file, index) => (
                    <MaterialCard
                      title={file?.originalFilename}
                      fileExtension={file?.fileExtension}
                      id={file?.id}
                      materialType="paper"
                      key={index}
                    />
                  ))}
                </div>
                {uploadedFiles.length > 6 && (
                  <Link href={`${paths.personalSpace}?category=materials`}>
                    <Button<"button"> styleType="secondarySimple">
                      View all
                    </Button>
                  </Link>
                )}
                <FileViewer/>
              </div>
            )
          : null
      }
    </div>
  );
};

export default ProfilePersonalSpaceBlock;
