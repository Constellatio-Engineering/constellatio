import SlidingPanelTitle from "@/components/molecules/slidingPanelTitle/SlidingPanelTitle";
import useNoteEditorStore from "@/stores/noteEditor.store";
import { showConfirmChangesDeletionModal } from "@/utils/modals";

import { Drawer } from "@mantine/core";
import { type FunctionComponent, useCallback } from "react";

import EditorForm from "./editorForm/EditorForm";
import * as styles from "./UploadedMaterialNoteDrawer.styles";

const UploadedMaterialNoteDrawer: FunctionComponent = () =>
{
  const { editorState } = useNoteEditorStore();

  const onClose = useCallback((): void =>
  {
    const { closeEditor, getComputedValues } = useNoteEditorStore.getState();
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
      withCloseButton={false}
      position="right"
      size="xl"
      styles={styles.drawerStyles()}
      title={(
        <SlidingPanelTitle
          title="Notizen"
          variant="default"
          closeButtonAction={onClose}
        />
      )}>
      {editorState.state !== "closed" && (
        <EditorForm
          onClose={onClose}
          editorState={editorState}
        />
      )}
    </Drawer>
  );
};

export default UploadedMaterialNoteDrawer;
