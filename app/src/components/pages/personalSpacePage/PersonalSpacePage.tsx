import { Button } from "@/components/atoms/Button/Button";
import { api } from "@/utils/api";

import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import React, { type FunctionComponent } from "react";

import * as styles from "./PersonalSpacePage.styles";

const PersonalSpacePage: FunctionComponent = () =>
{
  const ctx = api.useContext();
  const { data: allCases = [], isLoading: areCasesLoading } = api.caisy.getAllCases.useQuery();
  const { data: bookmarks = [], isLoading: areBookmarksLoading } = api.bookmarks.getAllBookmarks.useQuery();
  const allCasesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "case") ?? [];
  const bookmarkedCases = allCases.filter(caisyCase => allCasesBookmarks.some(bookmark => bookmark.resourceId === caisyCase.id));

  const { mutate: removeBookmark } = api.bookmarks.removeBookmark.useMutation({
    onError: e => console.log("error while removing bookmark:", e),
    onSuccess: async () => ctx.bookmarks.getAllBookmarks.invalidate(),
  });

  const openDeleteBookmark = (caseId: string): void =>
  {
    modals.openConfirmModal({
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this case from your favorites?
        </Text>
      ),
      confirmProps: { color: "red" },
      labels: { cancel: "No don't delete it", confirm: "Delete bookmark" },
      onConfirm: () => removeBookmark({ resourceId: caseId, resourceType: "case" }),
      title: "Remove from favorites",
    });
  };

  return (
    <div css={styles.wrapper}>
      <h1 style={{ fontSize: 40, marginBottom: 30 }}>Personal Space</h1>
      <p style={{ fontSize: 26, marginBottom: 10 }}><strong>Your bookmarked cases:</strong></p>
      {(areBookmarksLoading || areCasesLoading) ? (
        <p>Loading...</p>
      ) : (
        bookmarkedCases.map(bookmarkedCase => (
          <div key={bookmarkedCase.id} style={{ margin: "20 0" }}>
            <p style={{ fontSize: 20 }}>Case {bookmarkedCase.title}</p>
            <Button<"button">
              styleType="primary"
              onClick={() => openDeleteBookmark(bookmarkedCase.id!)}>
              Remove bookmark
            </Button>
          </div>
        ))
      )}
    </div>
  );
};

export default PersonalSpacePage;
