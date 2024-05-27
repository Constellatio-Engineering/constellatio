import { type Document } from "@/db/schema";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type EditorClosed = {
  state: "closed";
};

type EditorOpened = {
  editedDoc: Document;
  originalDoc: Document;
  state: "opened";
};

type EditorState = EditorClosed | EditorOpened;

type TagsEditorStoreProps = {
  closeEditor: () => void;
  editorState: EditorState;
  openEditor: (doc: Document) => void;
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
    editorState: {
      state: "closed",
    },
    openEditor: (doc) =>
    {
      set((state) =>
      {
        state.editorState = {
          editedDoc: doc,
          originalDoc: doc,
          state: "opened",
        };
      });
    }
  }))
);
