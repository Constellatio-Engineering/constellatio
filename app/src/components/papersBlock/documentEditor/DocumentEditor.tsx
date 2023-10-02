import SlidingPanelTitle from "@/components/molecules/slidingPanelTitle/SlidingPanelTitle";
import EditorForm from "@/components/papersBlock/documentEditor/editorForm/EditorForm";
import * as styles from "@/components/papersBlock/PapersBlock.styles";
import useDocumentEditorStore from "@/stores/documentEditor.store";

import { Drawer, ScrollArea } from "@mantine/core";
import React, { type FunctionComponent } from "react";

interface DocumentEditorProps {}

const DocumentEditor: FunctionComponent<DocumentEditorProps> = () =>
{
  const closeEditor = useDocumentEditorStore(s => s.closeEditor);
  const editorState = useDocumentEditorStore(s => s.editorState);
  const { title } = useDocumentEditorStore(s => s.getComputedValues());

  return (
    <Drawer
      opened={editorState.state !== "closed"}
      onClose={closeEditor}
      title={<SlidingPanelTitle title={title} variant="default" closeButtonAction={closeEditor}/>}
      position="right"
      withCloseButton={false}
      size="xl"
      scrollAreaComponent={ScrollArea.Autosize}
      styles={styles.drawerStyles()}>
      {editorState.state !== "closed" && (
        <EditorForm editorState={editorState}/>
      )}
    </Drawer>
  );
};

export default DocumentEditor;
