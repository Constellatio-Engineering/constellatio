import { Button } from "@/components/atoms/Button/Button";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";
import { NoteIcon } from "@/components/Icons/Note";
import DocumentEditor from "@/components/organisms/papersBlock/documentEditor/DocumentEditor";
import useDocuments from "@/hooks/useDocuments";
import useDocumentEditorStore from "@/stores/documentEditor.store";

import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./PapersBlock.styles";
import DocsTable from "../docsTable/DocsTable";
import EmptyStateCard from "../emptyStateCard/EmptyStateCard";

interface PapersBlockProps
{
  readonly isLoading: boolean;
  readonly selectedFolderId: string | null;
}

const PapersBlock: FunctionComponent<PapersBlockProps> = ({ isLoading, selectedFolderId }) =>
{
  const setCreateDocumentState = useDocumentEditorStore(s => s.setCreateDocumentState);
  const { documentsInAllFolders, documentsInSelectedFolder } = useDocuments();

  return (
    <div css={styles.wrapper}>
      <DocumentEditor/>
      <div css={styles.papersBlockHead}>
        <Title order={4}>Constellatio Docs <SubtitleText className="count" component="span" styleType="subtitle-01-medium">({documentsInSelectedFolder.length ?? 0})</SubtitleText>
        </Title>
        <Button<"button">
          styleType="secondarySimple" 
          leftIcon={<NoteIcon/>}
          onClick={() => setCreateDocumentState({ folderId: selectedFolderId })}>
          Erstellen
        </Button>
      </div>
      {!isLoading && (
        <>
          {documentsInSelectedFolder.length > 0 ? (
            <div css={styles.papersBlockTable}>
              <DocsTable docs={documentsInSelectedFolder}/>
            </div>
          ) : documentsInAllFolders.length > 0 ? (
            <EmptyStateCard
              variant="For-small-areas"
              title="Keine Constellatio Docs in diesem Ordner"
              text="Klicke hier um eine neues Constellatio Doc zu erstellen."
            />
          ) : (
            <EmptyStateCard
              variant="For-small-areas"
              title="Du hast noch keine Constellatio Docs erstellt"
              text="Constellatio Docs sind deine digitalen Textdateien, in denen du Anmerkungen, Zusammenfassungen und vieles Weitere direkt in der Cloud speichern kannst. Du kannst sie jederzeit als .pdf-Datei exportieren und herunterladen."
            />
          )}
        </>
      )}
    </div>
  );
};

export default PapersBlock;
