import SlidingPanelFileTypeRow from "@/components/molecules/slidingPanelFileTypeRow/SlidingPanelFileTypeRow";
import SlidingPanelTitle from "@/components/molecules/slidingPanelTitle/SlidingPanelTitle";
import { useTagsEditorStore } from "@/stores/tagsEditor.store";
import { showConfirmChangesDeletionModal } from "@/utils/modals";

import { Drawer } from "@mantine/core";
import React, { type FunctionComponent, useCallback } from "react";

import * as styles from "./MaterialTagsDrawer.styles";

export const MaterialTagsDrawer: FunctionComponent = () =>
{
  const { editorState } = useTagsEditorStore();

  const onClose = useCallback((): void =>
  {
    const { closeEditor } = useTagsEditorStore.getState();

    closeEditor();

    /* const { hasUnsavedChanges } = getComputedValues();

    if(!hasUnsavedChanges)
    {
      closeEditor();
      return;
    }

    showConfirmChangesDeletionModal({ onCancel: closeEditor });*/
  }, []);

  console.log(editorState);

  return (
    <Drawer
      lockScroll={false}
      opened={editorState.state === "opened"}
      onClose={onClose}
      withCloseButton={false}
      position="right"
      size="xl"
      styles={styles.drawerStyles()}
      title={(
        <SlidingPanelTitle
          title="Tags"
          variant="default"
          closeButtonAction={onClose}
        />
      )}>
      {editorState.state === "opened" && (
        <>
          <SlidingPanelFileTypeRow
            variant="constellatioDocs"
            title={editorState.originalDoc.name}
          />
        </>
      )}
    </Drawer>
  );
};
