import SlidingPanelFileTypeRow from "@/components/molecules/slidingPanelFileTypeRow/SlidingPanelFileTypeRow";
import SlidingPanelTitle from "@/components/molecules/slidingPanelTitle/SlidingPanelTitle";
import TagsSelector from "@/components/organisms/materialTagsDrawer/tagsSelector/TagsSelector";
import { useTagsEditorStore } from "@/stores/tagsEditor.store";
import { showConfirmChangesDeletionModal } from "@/utils/modals";

import { Drawer } from "@mantine/core";
import React, { type FunctionComponent, useCallback } from "react";

import * as styles from "./MaterialTagsDrawer.styles";

export const tags = [
  {
    id: "1",
    name: "Tag 1",
  },
  {
    id: "2",
    name: "Tag 2",
  },
  {
    id: "3",
    name: "Tag 3",
  },
  {
    id: "4",
    name: "Tag 4",
  },
  {
    id: "5",
    name: "Tag 5",
  },
  {
    id: "6",
    name: "Tag 6",
  },
  {
    id: "7",
    name: "Tag 7",
  },
  {
    id: "8",
    name: "Tag 8",
  },
  {
    id: "9",
    name: "Tag 9",
  },
  {
    id: "10",
    name: "Tag 10",
  },
] as const;

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
          <TagsSelector/>
        </>
      )}
    </Drawer>
  );
};
