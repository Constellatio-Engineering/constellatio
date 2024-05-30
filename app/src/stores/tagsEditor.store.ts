import { type GetDocumentResult } from "@/server/api/routers/documents.router";
import { type GetUploadedFileResult } from "@/server/api/routers/uploads.router";
import { areArraysEqualSets } from "@/utils/array";

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

export type EditorOpened = {
  editedTags: string[];
  entity: TagsEditorEntity;
  originalTags: string[];
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
          state.editorState.editedTags = state.editorState.editedTags.filter((_tagId) => _tagId !== tagId);
        }
      });
    },
    editorState: {
      state: "closed",
    },
    getComputedValues: () =>
    {
      const { editorState } = get();

      return {
        hasUnsavedChanges: editorState.state === "closed" ? false : !areArraysEqualSets(editorState.editedTags, editorState.originalTags),
      } satisfies ComputedEditorValues;
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
        const tagIds = entity.data.tags.map(({ tagId }) => tagId);

        state.editorState = {
          editedTags: tagIds,
          entity,
          originalTags: tagIds,
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
          state.editorState.editedTags = state.editorState.editedTags.concat(tagId);
        }
      });
    }
  }))
);
