import { type GetDocumentResult } from "@constellatio/api/routers/documents.router";
import { type GetUploadedFileResult } from "@constellatio/api/routers/uploads.router";
import { type IGenTags } from "@constellatio/cms/generated-types";
import { type TagSearchIndexItem } from "@constellatio/meilisearch/utils";
import { areArraysEqualSets } from "@constellatio/utils/array";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type EditorClosed = {
  state: "closed";
};

type GetDocumentResultEntity = {
  data: GetDocumentResult;
  entityType: "user-documents";
};

type GetUploadedFileResultEntity = {
  data: GetUploadedFileResult;
  entityType: "user-uploads";
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
  selectTag: (tag: Tag) => void;
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

        state.editorState = {
          editedTags: tags,
          entity,
          originalTags: tags,
          state: "opened",
        };
      });
    },
    selectTag: (tag) =>
    {
      set((state) =>
      {
        if(state.editorState.state === "opened")
        {
          state.editorState.editedTags = state.editorState.editedTags.concat(tag);
        }
      });
    }
  }))
);
