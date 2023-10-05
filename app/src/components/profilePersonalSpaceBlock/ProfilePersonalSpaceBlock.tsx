import useBookmarks from "@/hooks/useBookmarks";
import useCases from "@/hooks/useCases";
import { type IGenCase } from "@/services/graphql/__generated/sdk";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { type FunctionComponent, useState } from "react";

import * as styles from "./ProfilePersonalSpaceBlock.styles";
import { Button } from "../atoms/Button/Button";
import FavoriteCard from "../favoriteCard/FavoriteCard";
import { Bookmark } from "../Icons/Bookmark";
import { FileIcon } from "../Icons/FileIcon";
import MaterialCard from "../materialCard/MaterialCard";
import EmptyStateCard from "../organisms/emptyStateCard/EmptyStateCard";
import ProfilePersonalSpaceBlockHead from "../profilePersonalSpaceBlockHead/ProfilePersonalSpaceBlockHead";

const ProfilePersonalSpaceBlock: FunctionComponent = () => 
{
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { bookmarks, isLoading } = useBookmarks(undefined);
  const allCasesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "case") ?? [];
  const { allCases = [] } = useCases();
  const bookmarkedCases = allCases.filter(caisyCase => allCasesBookmarks.some(bookmark => bookmark.resourceId === caisyCase.id));
  const tabs = [{ icon: { src: <Bookmark/> }, number: bookmarkedCases?.length, title: "favorites" }, { icon: { src: <FileIcon/> }, number: 0, title: " materials" }];

  return (
    <div css={styles.wrapper}>
      <ProfilePersonalSpaceBlockHead selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs}/>
      {selectedTab === 0 && (
        <div css={styles.favoritesTab}>
          <div css={styles.casesCard}>
            {
              isLoading ? ("Loading...") : 
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
        selectedTab === 1 && (
          <div css={styles.uploadedMaterialsTab}>
            <MaterialCard title=" the card with long titlews" fileExtension="pdf" materialType="paper"/>
          </div>
        )
      }
    </div>
  );
};

export default ProfilePersonalSpaceBlock;
