import { Button } from "@/components/atoms/Button/Button";
import { Bookmark } from "@/components/Icons/Bookmark";
import { FileIcon } from "@/components/Icons/FileIcon";
import FavoriteCard from "@/components/molecules/favoriteCard/FavoriteCard";
import MaterialCard from "@/components/molecules/materialCard/MaterialCard";
import ProfilePersonalSpaceBlockHead from "@/components/molecules/profilePersonalSpaceBlockHead/ProfilePersonalSpaceBlockHead";
import useBookmarks from "@/hooks/useBookmarks";
import useCases from "@/hooks/useCases";
import useUploadedFiles from "@/hooks/useUploadedFiles";
import useUploadFolders from "@/hooks/useUploadFolders";
import { type IGenCase } from "@/services/graphql/__generated/sdk";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { type FunctionComponent, useState } from "react";

import * as styles from "./ProfilePersonalSpaceBlock.styles";
import EmptyStateCard from "../emptyStateCard/EmptyStateCard";

const ProfilePersonalSpaceBlock: FunctionComponent = () => 
{
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { bookmarks, isLoading: isUseBookmarksLoading, } = useBookmarks(undefined);
  const allCasesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "case") ?? [];
  const { allCases = [], isLoading: isUseCasesLoading, } = useCases();
  const bookmarkedCases = allCases.filter(caisyCase => allCasesBookmarks.some(bookmark => bookmark.resourceId === caisyCase.id));
  const { folders = [] } = useUploadFolders();
  const { isLoading: isGetUploadedFilesLoading, uploadedFiles } = useUploadedFiles(folders[0]?.id ?? "");
  const tabs = [{ icon: { src: <Bookmark/> }, number: bookmarkedCases?.length, title: "favorites" }, { icon: { src: <FileIcon/> }, number: uploadedFiles?.length, title: " materials" }];

  return (
    <div css={styles.wrapper}>
      <ProfilePersonalSpaceBlockHead selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs}/>
      {selectedTab === 0 && (
        <div css={styles.favoritesTab}>
          <div css={styles.casesCard}>
            {
              (isUseBookmarksLoading || isUseCasesLoading) ? ("loading...") :
                bookmarkedCases && 
              bookmarkedCases.length > 0 ? (
                    bookmarkedCases?.slice(0, 6)?.map((bookmarkCase: IGenCase, index: number) => bookmarkCase && (
                      <React.Fragment key={index}>
                        <FavoriteCard
                          onClick={async () => router.push(`/cases/${bookmarkCase?.id}`)}
                          title={bookmarkCase.title ?? ""}
                          variant="case"
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
          {bookmarkedCases && bookmarkedCases?.length > 6 && (
            <Link href="/personal-space">
              <Button<"button"> styleType="secondarySimple">
                View all
              </Button>
            </Link>
          )}
        </div>
      )}
      {
        isGetUploadedFilesLoading ? ("loading...") :
          selectedTab === 1 && (
            <div>
              <div css={styles.uploadedMaterialsTab}>
                {uploadedFiles.slice(0, 6).map((file, index) => (
                  <MaterialCard
                    title={file?.originalFilename}
                    fileExtension={file?.fileExtension}
                    materialType="paper"
                    key={index}
                  />
                ))}
              </div>
              {uploadedFiles.length > 6 && (
                <Link href="/personal-space">
                  <Button<"button"> styleType="secondarySimple">
                    View all
                  </Button>
                </Link>
              )}
            </div>
          )
      }
    </div>
  );
};

export default ProfilePersonalSpaceBlock;
