import { type GetDocumentResult } from "@/server/api/routers/documents.router";
import { type GetUploadedFileResult } from "@/server/api/routers/uploads.router";
import { type IGenTags } from "@/services/graphql/__generated/sdk";
import { areArraysEqualSets } from "@/utils/array";
import { type TagSearchIndexItem } from "@/utils/search";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type EditorClosed = {
  state: "closed";
};

type GetDocumentResultEntity = {
  data: GetDocumentResult;
  entityType: "document";
};

type GetUploadedFileResultEntity = {
  data: GetUploadedFileResult;
  entityType: "file";
};

type TagsEditorEntity = GetDocumentResultEntity | GetUploadedFileResultEntity;
type Tag = IGenTags | TagSearchIndexItem;

export type EditorOpened = {
  editedTags: Tag[];
  entity: TagsEditorEntity;
  originalTags: Tag[];
  state: "opened";
};

type EditorState = EditorClosed | EditorOpened;

type ComputedEditorValues = {
  hasUnsavedChanges: boolean;
};

type TagsEditorStoreProps = {
  closeEditor: () => void;
  deselectTag: (tagId: string) => void;
  editorState: EditorState;
  getComputedValues: () => ComputedEditorValues;
  onSuccessfulMutation: () => void;
  openEditor: (entity: TagsEditorEntity) => void;
  selectTag: (tagId: string) => void;
};

export const useTagsEditorStore = create(
  immer<TagsEditorStoreProps>((set, get) => ({
    closeEditor: () =>
    {
      set((state) =>
      {
        state.editorState = { state: "closed" };
      });
    },
    deselectTag: (tagId) =>
    {
      set((state) =>
      {
        if(state.editorState.state === "opened")
        {
          state.editorState.editedTags = state.editorState.editedTags.filter(({ id }) => id !== tagId);
        }
      });
    },
    editorState: {
      state: "closed",
    },
    getComputedValues: () =>
    {
      const { editorState } = get();

      let computedValues: ComputedEditorValues;

      if(editorState.state === "closed")
      {
        computedValues = {
          hasUnsavedChanges: false
        };
      }
      else
      {
        const editedTagsIds = editorState.editedTags.map(({ id }) => id);
        const originalTagsIds = editorState.originalTags.map(({ id }) => id);

        computedValues = {
          hasUnsavedChanges: !areArraysEqualSets(editedTagsIds, originalTagsIds)
        };
      }

      return computedValues;
    },
    onSuccessfulMutation: () =>
    {
      set((state) =>
      {
        if(state.editorState.state === "opened")
        {
          state.editorState.originalTags = state.editorState.editedTags;
        }
      });
    },
    openEditor: (entity) =>
    {
      set((state) =>
      {
        const { tags } = entity.data;

        const tagsPlaceholder = tags.map((tag) => ({ tagId: tag.tagId, tagName: "dummy" }));

        state.editorState = {
          editedTags: tagsPlaceholder,
          entity,
          originalTags: tagsPlaceholder,
          state: "opened",
        };
      });
    },
    selectTag: (tagId) =>
    {
      set((state) =>
      {
        if(state.editorState.state === "opened")
        {
          state.editorState.editedTags = state.editorState.editedTags.concat({ id: tagId, tagName: "dummy" });
        }
      });
    }
  }))
);
