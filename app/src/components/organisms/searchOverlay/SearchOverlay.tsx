import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import Label from "@/components/atoms/label/Label";
import Tag from "@/components/atoms/tag/Tag";
import SearchBar from "@/components/molecules/searchBar/SearchBar";
import useSearchStore from "@/stores/search.store";

import { Drawer, Loader } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, type FunctionComponent } from "react";

import * as styles from "./SearchOverlay.styles";
import EmptyStateCard from "../emptyStateCard/EmptyStateCard";

interface SearchOverlayProps {}

const SearchOverlay: FunctionComponent<SearchOverlayProps> = () => 
{
  const isDrawerOpened = useSearchStore((s) => s.isDrawerOpened);
  const toggleDrawer = useSearchStore((s) => s.toggleDrawer);
  const searchResults = useSearchStore((s) => s.searchResults);
  const isLoading = useSearchStore((s) => s.isLoading);
  const searchValue = useSearchStore((s) => s.searchValue);
  const hasInput = searchValue.length > 0;

  // const router = useRouter();

  // useEffect(() => 
  // {
  //   toggleDrawer(false);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [router.pathname]);

  console.log("searchResults", searchResults);
  return (
    <Drawer
      padding={0}
      withCloseButton={false}
      returnFocus={false}
      opened={isDrawerOpened}
      onClose={() => toggleDrawer(false)}
      position="top"
      title={<SearchBar/>}
      styles={styles.drawerStyles()}>
      <div css={styles.suggestionsLeft}>
        {hasInput && isLoading && <Loader color="brand-01.4" size="30px"/>}
        {hasInput && searchResults.cases.length < 1 
          ? (
            <span className="emptyStateCard">
              <EmptyStateCard
                variant="For-small-areas"
                title="No search results in cases"
                text="Please adjust your search if you’re looking for the materials in the categories mentioned above"
              />
            </span>
          ) : (
            hasInput && (
              <>
                <div className="suggestion__section">
                  <Label variant="case">Cases</Label>
                  {searchResults.cases.map((result) => (
                    <Link
                      key={result.id}
                      href={`cases/${result.id}`}
                      className="suggestion__section__link">
                      <CustomLink styleType="link-content-title" component="p">
                        {result.title}
                      </CustomLink>
                      <Tag>{result.mainCategory.mainCategory}</Tag>
                    </Link>
                  ))}
                </div>
                <div className="suggestion__section">
                  <Label variant="case">Cases</Label>
                  {searchResults.cases.map((result) => (
                    <Link
                      key={result.id}
                      href={`cases/${result.id}`}
                      className="suggestion__section__link">
                      <CustomLink styleType="link-content-title" component="p">
                        {result.title}
                      </CustomLink>
                      <Tag>{result.mainCategory.mainCategory}</Tag>
                    </Link>
                  ))}
                </div>
              </>
            )
          )}
      </div>
      <div css={styles.suggestionsRight}>
        {hasInput && isLoading && <Loader color="brand-01.4" size="30px"/>}
        {hasInput && searchResults.userUploads.length > 0 && 
        (
          <>
            <div className="suggestion__section">
              <Label variant="neutral">Your materials</Label>
              {searchResults.userUploads.map((result) => (
                <span
                  key={result.uuid}
                  className="suggestion__section__link">
                  <CustomLink styleType="link-content" component="p">
                    {result.originalFilename}
                  </CustomLink>
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
};

export default SearchOverlay;
