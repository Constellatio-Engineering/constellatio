import { tags } from "@/components/organisms/materialTagsDrawer/MaterialTagsDrawer";
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
  onSuccessfulMutation: () => void;
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

          const edited = tags.filter(({ id }) => editorState.editedTags.includes(id));
          const original = tags.filter(({ id }) => editorState.originalTags.includes(id));

          console.log("------------");
          console.log("document", editorState.document.name);
          console.log("editedTags", edited.map(({ name }) => name));
          console.log("originalTags", original.map(({ name }) => name));
          console.log("hasUnsavedChanges", computedValues.hasUnsavedChanges);

          break;
        }
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
