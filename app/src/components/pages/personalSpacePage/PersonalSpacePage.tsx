import { api } from "@/utils/api";

import React, { type FunctionComponent } from "react";

import * as styles from "./PersonalSpacePage.styles";

const PersonalSpacePage: FunctionComponent = () =>
{
  const { data: bookmarks = [], isLoading } = api.bookmarks.getAllBookmarks.useQuery();
  const allCasesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "case") ?? [];

  return (
    <div css={styles.wrapper}>
      <h1>Personal Space</h1>
      <p><strong>Your bookmarks on cases</strong></p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        allCasesBookmarks.map(bookmark => (
          <div key={bookmark.uuid}>
            <p>Case {bookmark.resourceId}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PersonalSpacePage;
