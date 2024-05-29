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
    id: "eecce24e-e6ea-4518-8129-f1882bb5b289",
    name: "Tag 1",
  },
  {
    id: "39a4a944-ece7-45d3-923a-e6b91ca04479",
    name: "Tag 2",
  },
  {
    id: "7778a9b2-99eb-49a5-affd-2d9a724ee091",
    name: "Tag 3",
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
          <TagsSelector docId={editorState.originalDoc.id}/>
        </>
      )}
    </Drawer>
  );
};
