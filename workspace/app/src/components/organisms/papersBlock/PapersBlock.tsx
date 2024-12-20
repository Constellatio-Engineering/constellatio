import { Button } from "@/components/atoms/Button/Button";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";
import { NoteIcon } from "@/components/Icons/Note";
import useDocuments from "@/hooks/useDocuments";
import useDocumentEditorStore from "@/stores/documentEditor.store";

import { Title } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "./PapersBlock.styles";
import DocsTable from "../docsTable/DocsTable";
import EmptyStateCard from "../emptyStateCard/EmptyStateCard";

interface PapersBlockProps
{
  readonly isLoading: boolean;
  readonly selectedFolderId: string | null | undefined;
}

const PapersBlock: FunctionComponent<PapersBlockProps> = ({ isLoading, selectedFolderId }) =>
{
  const setCreateDocumentState = useDocumentEditorStore(s => s.setCreateDocumentState);
  const { documentsInAllFolders, documentsInSelectedFolder } = useDocuments();
  const onCreateDocument = (): void =>
  {
    if(selectedFolderId === undefined)
    {
      console.error("Cannot create document without selected folder");
      return;
    }

    setCreateDocumentState({ folderId: selectedFolderId });
  };

  return (
    <div css={styles.wrapper}>
      <div css={styles.papersBlockHead}>
        <Title order={4}>Constellatio Docs <SubtitleText className="count" component="span" styleType="subtitle-01-medium">({documentsInSelectedFolder.length ?? 0})</SubtitleText>
        </Title>
        <div style={{ height: 40 }}>
          {selectedFolderId !== undefined && (
            <Button<"button">
              styleType="secondarySimple"
              leftIcon={<NoteIcon/>}
              onClick={onCreateDocument}>
              Erstellen
            </Button>
          )}
        </div>
      </div>
      {!isLoading && (
        <>
          {documentsInSelectedFolder.length > 0 ? (
            <div css={styles.papersBlockTable}>
              <DocsTable docs={documentsInSelectedFolder}/>
            </div>
          ) : (
            <>
              <EmptyStateCard
                variant="For-small-areas"
                title={
                  selectedFolderId === undefined
                    ? "Wähle einen Ordner aus, um dein erstes Constellatio Doc zu erstellen."
                    : documentsInAllFolders.length > 0
                      ? "Keine Constellatio Docs in diesem Ordner"
                      : "Du hast noch keine Constellatio Docs erstellt"
                }
                text="Constellatio Docs sind deine digitalen Textdateien, in denen du Anmerkungen, Zusammenfassungen und vieles Weitere direkt in der Cloud speichern kannst. Du kannst sie jederzeit als .pdf-Datei exportieren und herunterladen."
                button={selectedFolderId === undefined ? undefined : {
                  content: "Doc erstellen",
                  icon: <NoteIcon/>,
                  onClick: onCreateDocument
                }}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PapersBlock;
