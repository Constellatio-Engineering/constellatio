import DocumentEditor from "@/components/papersBlock/documentEditor/DocumentEditor";
import { type Document } from "@/db/schema";
import useDocumentEditorStore from "@/stores/documentEditor.store";

import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./PapersBlock.styles";
import { Button } from "../atoms/Button/Button";
import { SubtitleText } from "../atoms/SubtitleText/SubtitleText";
import { NoteIcon } from "../Icons/Note";
import DocsTable from "../organisms/docsTable/DocsTable";
import EmptyStateCard from "../organisms/emptyStateCard/EmptyStateCard";

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
        <Title order={4}>Constellatio docs <SubtitleText className="count" component="span" styleType="subtitle-01-medium">({docs.length ?? 0})</SubtitleText>
        </Title>
        <Button<"button">
          styleType="secondarySimple" 
          leftIcon={<NoteIcon/>}
          onClick={() => setCreateDocumentState({ folderId: selectedFolderId })}>
          Create doc
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
              title="You haven’t created any docs yet"
              text="Constellatio docs are text documents where you leave your notes, summaries, etc"
            />
          )}
        </>
      )}
    </div>
  );
};

export default PapersBlock;
