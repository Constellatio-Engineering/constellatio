import { Button } from "@/components/atoms/Button/Button";
import SlidingPanelFileTypeRow from "@/components/molecules/slidingPanelFileTypeRow/SlidingPanelFileTypeRow";
import SlidingPanelTitle from "@/components/molecules/slidingPanelTitle/SlidingPanelTitle";
import TagsSelector from "@/components/organisms/materialTagsDrawer/tagsSelector/TagsSelector";
import { useOnDocumentMutation } from "@/hooks/useOnDocumentMutation";
import { useOnUploadedFileMutation } from "@/hooks/useOnUploadedFileMutation";
import { useTagsEditorStore } from "@/stores/tagsEditor.store";
import { api } from "@/utils/api";
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
  const { onDocumentMutation } = useOnDocumentMutation();
  const { onUploadedFileMutation } = useOnUploadedFileMutation();
  const { editorState } = useTagsEditorStore();
  const { hasUnsavedChanges } = useTagsEditorStore(s => s.getComputedValues());
  const { mutate: setTags } = api.tags.setTagsForEntity.useMutation({
    onError: () => console.log("error"),
    onSuccess: async (_data, variables) =>
    {
      if(variables.entityType === "document")
      {
        await onDocumentMutation();
      }
      else
      {
        await onUploadedFileMutation();
      }

      useTagsEditorStore.getState().onSuccessfulMutation();
    }
  });

  const onClose = useCallback((): void =>
  {
    const { closeEditor, getComputedValues } = useTagsEditorStore.getState();

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
      opened={editorState.state === "opened"}
      onClose={onClose}
      withCloseButton={false}
      position="right"
      size="xl"
      styles={styles.drawerStyles()}
      title={(
        <SlidingPanelTitle
          title="Tags"
          closeButtonAction={onClose}
        />
      )}>
      {editorState.state === "opened" && (
        <>
          <div css={styles.contentWrapper}>
            {editorState.entity.entityType === "document" && (
              <SlidingPanelFileTypeRow
                variant="constellatioDocs"
                title={editorState.entity.data.name}
              />
            )}
            {editorState.entity.entityType === "file" && (
              <SlidingPanelFileTypeRow
                variant="file"
                fileName={editorState.entity.data.originalFilename}
                fileExtension={editorState.entity.data.fileExtension}
              />
            )}
            <TagsSelector
              editorState={editorState}
            />
          </div>
          <div css={styles.ctaWrapper}>
            <Button<"button">
              styleType="primary"
              disabled={!hasUnsavedChanges}
              onClick={() => setTags({
                entityId: editorState.entity.data.id,
                entityType: editorState.entity.entityType,
                tagIds: editorState.editedTags,
              })}>
              Speichern
            </Button>
          </div>
        </>
      )}
    </Drawer>
  );
};
