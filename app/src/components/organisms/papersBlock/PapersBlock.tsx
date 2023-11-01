import { Button } from "@/components/atoms/Button/Button";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";
import { NoteIcon } from "@/components/Icons/Note";
import DocumentEditor from "@/components/organisms/papersBlock/documentEditor/DocumentEditor";
import { type Document } from "@/db/schema";
import useDocumentEditorStore from "@/stores/documentEditor.store";

import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./PapersBlock.styles";
import DocsTable from "../docsTable/DocsTable";
import EmptyStateCard from "../emptyStateCard/EmptyStateCard";

interface PapersBlockProps
{
  readonly docs: Document[];
  readonly isLoading: boolean;
  readonly selectedFolderId: string | null;
}

const PapersBlock: FunctionComponent<PapersBlockProps> = ({ docs, isLoading, selectedFolderId }) =>
{
  const setCreateDocumentState = useDocumentEditorStore(s => s.setCreateDocumentState);

  return (
    <div css={styles.wrapper}>
      <DocumentEditor/>
      <div css={styles.papersBlockHead}>
        <Title order={4}>Constellatio Docs <SubtitleText className="count" component="span" styleType="subtitle-01-medium">({docs.length ?? 0})</SubtitleText>
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
          {docs.length > 0 ? (
            <div css={styles.papersBlockTable}>
              <DocsTable docs={docs}/>
            </div>
          ) : (
            <EmptyStateCard
              variant="For-small-areas"
              title="Du hast noch keine Constellatio Docs erstellt"
              text="Constellatio Docs sind deine digitalen Textdateien, in denen du Anmerkungen, Zusammenfassungen und vieles Weitere direkt in der Cloud speichern kannst.
              Du kannst sie jederzeit als .pdf-Datei exportieren und herunterladen."
            />
          )}
        </>
      )}
    </div>
  );
};

export default PapersBlock;
