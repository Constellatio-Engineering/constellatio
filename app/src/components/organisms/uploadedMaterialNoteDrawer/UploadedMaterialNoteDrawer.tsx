import SlidingPanelTitle from "@/components/molecules/slidingPanelTitle/SlidingPanelTitle";
import useNoteEditorStore from "@/stores/noteEditor.store";

import { Drawer } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import EditorForm from "./editorForm/EditorForm";
import * as styles from "./UploadedMaterialNoteDrawer.styles";

interface UploadedMaterialNoteDrawerProps 
{
  readonly selectedFolderId: string | null;
}

const UploadedMaterialNoteDrawer: FunctionComponent<UploadedMaterialNoteDrawerProps> = ({
  selectedFolderId
}) =>
{
  const { closeEditor, editorState } = useNoteEditorStore();

  return (
    <Drawer
      lockScroll={false}
      opened={editorState.state !== "closed"}
      onClose={closeEditor}
      withCloseButton={false}
      position="right"
      size="xl"
      styles={styles.drawerStyles()}
      title={(
        <SlidingPanelTitle
          title="Notes"
          variant="default"
          closeButtonAction={closeEditor}
        />
      )}>
      {editorState.state !== "closed" && (
        <EditorForm
          editorState={editorState}
          selectedFolderId={selectedFolderId}
        />
      )}
    </Drawer>
  );
};

export default UploadedMaterialNoteDrawer;
