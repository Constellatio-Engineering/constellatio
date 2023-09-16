import { Button } from "@/components/atoms/Button/Button";
import { api } from "@/utils/api";

import { Loader, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import axios from "axios";
import React, { type FormEvent, type FunctionComponent, useState } from "react";

import * as styles from "./PersonalSpacePage.styles";

const PersonalSpacePage: FunctionComponent = () =>
{
  const ctx = api.useContext();
  const { data: allCases = [], isLoading: areCasesLoading } = api.caisy.getAllCases.useQuery();
  const { data: bookmarks = [], isLoading: areBookmarksLoading } = api.bookmarks.getAllBookmarks.useQuery();
  const allCasesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "case") ?? [];
  const bookmarkedCases = allCases.filter(caisyCase => allCasesBookmarks.some(bookmark => bookmark.resourceId === caisyCase.id));
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const { mutate: removeBookmark } = api.bookmarks.removeBookmark.useMutation({
    onError: e => console.log("error while removing bookmark:", e),
    onSuccess: async () => ctx.bookmarks.getAllBookmarks.invalidate(),
  });

  const { mutateAsync: createSignedUploadUrl } = api.uploads.createSignedUploadUrl.useMutation();

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

  const [file, setFile] = useState<File>();

  const uploadFile = async (e: FormEvent<HTMLFormElement>): Promise<void> =>
  {
    e.preventDefault();

    if(!file)
    {
      console.log("no file selected");
      return;
    }

    console.log("uploading file '", `${file.name}'...`);

    const uploadUrl = await createSignedUploadUrl({
      contentType: file.type,
      fileSizeInBytes: file.size,
      filename: file.name
    });

    await axios.put(uploadUrl, file, {
      headers: { "Content-Type": file.type }
    });

    console.log("file uploaded successfully");
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
      <div style={{ alignItems: "center", display: "flex", marginTop: 100 }}>
        <h2 style={{ fontSize: 22, marginRight: 10 }}>Test signed upload url</h2>
        {isUploading && (
          <Loader size={26}/>
        )}
      </div>
      <form onSubmit={async e =>
      {
        setIsUploading(true);

        try
        {
          await uploadFile(e);
          setFile(undefined);
          
          if(fileInputRef.current)
          {
            fileInputRef.current.value = "";
          }
        }
        catch (e: unknown)
        {
          console.log("error while uploading file", e);
        }
        finally
        {
          setIsUploading(false);
        }
      }}>
        Select File:{" "}
        <input
          ref={fileInputRef}
          type="file"
          onChange={e => setFile(e.target.files![0])}
        />
        <Button<"button">
          styleType="primary"
          disabled={isUploading}
          type="submit">
          Upload
        </Button>
      </form>
      {file && <p>{file.name}</p>}
    </div>
  );
};

export default PersonalSpacePage;
