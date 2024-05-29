import { type GetDocumentResult } from "@/server/api/routers/documents.router";
import { areArraysEqualSets } from "@/utils/array";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type EditorClosed = {
  state: "closed";
};

export type EditorOpened = {
  document: GetDocumentResult;
  editedTags: string[];
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
  openEditor: (doc: GetDocumentResult) => void;
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

      let computedValues: ComputedEditorValues;

      switch (editorState.state)
      {
        case "closed":
        {
          computedValues = {
            hasUnsavedChanges: false,
          };
          break;
        }
        case "opened":
        {
          computedValues = {
            hasUnsavedChanges: !areArraysEqualSets(editorState.editedTags, editorState.originalTags),
          };

          console.log("------------");
          console.log("editorState.editedDoc.tags", editorState.editedTags);
          console.log("editorState.originalDoc.tags", editorState.originalTags);
          console.log("hasUnsavedChanges", computedValues.hasUnsavedChanges);

          break;
        }
      }

      return computedValues;
    },
    openEditor: (doc) =>
    {
      set((state) =>
      {
        const tagIds = doc.tags.map(({ tagId }) => tagId);

        state.editorState = {
          document: doc,
          editedTags: tagIds,
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
