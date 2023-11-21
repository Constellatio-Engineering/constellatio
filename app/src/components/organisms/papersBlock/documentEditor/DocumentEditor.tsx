import SlidingPanelTitle from "@/components/molecules/slidingPanelTitle/SlidingPanelTitle";
import * as styles from "@/components/organisms/papersBlock/PapersBlock.styles";
import useDocumentEditorStore from "@/stores/documentEditor.store";
import { showConfirmChangesDeletionModal } from "@/utils/modals";

import { Drawer, ScrollArea } from "@mantine/core";
import React, { type FunctionComponent, useCallback } from "react";

import EditorForm from "./editorForm/EditorForm";

interface DocumentEditorProps {}

const DocumentEditor: FunctionComponent<DocumentEditorProps> = () =>
{
  const editorState = useDocumentEditorStore(s => s.editorState);
  const { title } = useDocumentEditorStore(s => s.getComputedValues());

  const onClose = useCallback((): void =>
  {
    const { closeEditor, getComputedValues } = useDocumentEditorStore.getState();
    const { hasUnsavedChanges } = getComputedValues();

    if(!hasUnsavedChanges)
    {
      closeEditor();
      return;
    }

    showConfirmChangesDeletionModal({ onCancel: closeEditor });
  }, []);

  return (
    <Drawer
      lockScroll={false}
      opened={editorState.state !== "closed"}
      onClose={onClose}
      title={<SlidingPanelTitle title={title} variant="default" closeButtonAction={onClose}/>}
      position="right"
      withCloseButton={false}
      size="xl"
      scrollAreaComponent={ScrollArea.Autosize}
      styles={styles.drawerStyles()}>
      {editorState.state !== "closed" && (
        <EditorForm
          onClose={onClose}
          editorState={editorState}
        />
      )}
    </Drawer>
  );
};

export default DocumentEditor;
