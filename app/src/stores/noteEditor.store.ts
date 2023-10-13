import { type Note } from "@/db/schema";
import { getRandomUuid } from "@/utils/utils";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type NoteUpdate = Partial<Pick<Note, "content">>;
type NewNote = Pick<Note, "id" | "content" | "fileId">;

type EditorClosed = {
  state: "closed";
};

type EditNote = {
  note: Note;
  originalNote: Note;
  state: "edit";
};

type CreateNote = {
  note: NewNote;
  state: "create";
};

type ViewNote = {
  note: Note;
  state: "view";
};

export type EditorStateDrawerOpened = EditNote | CreateNote | ViewNote;
type EditorState = EditorClosed | EditorStateDrawerOpened;

type ComputedEditorValues = {
  hasUnsavedChanges: boolean;
};

type NoteEditorStoreProps = {
  closeEditor: () => void;
  editorState: EditorState;
  getComputedValues: () => ComputedEditorValues;
  setCreateNoteState: (params: { fileId: string }) => void;
  setEditNoteState: (note: Note) => void;
  setViewNoteState: (note: Note) => void;
  updateNote: (noteUpdate: NoteUpdate) => void;
};

const useNoteEditorStore = create(
  immer<NoteEditorStoreProps>((set, get) => ({
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
    getComputedValues: () =>
    {
      const { editorState } = get();

      let computedValues: ComputedEditorValues;

      switch (editorState.state)
      {
        case "closed":
        {
          computedValues = { hasUnsavedChanges: false };
          break;
        }
        case "view":
        {
          computedValues = { hasUnsavedChanges: false };
          break;
        }
        case "create":
        {
          const { note } = editorState;
          computedValues = { hasUnsavedChanges: note.content.length > 0 };
          break;
        }
        case "edit":
        {
          const { note, originalNote } = editorState;
          let hasUnsavedChanges: boolean;

          if(originalNote == null && note?.content.length > 0)
          {
            hasUnsavedChanges = true;
          }
          else if(originalNote?.content !== note?.content)
          {
            hasUnsavedChanges = true;
          }
          else
          {
            hasUnsavedChanges = false;
          }

          computedValues = { hasUnsavedChanges };

          break;
        }
        default:
        {
          console.error("Unknown editor state:", editorState);
          computedValues = { hasUnsavedChanges: false };
          break;
        }
      }

      return computedValues;
    },
    setCreateNoteState: ({ fileId }) =>
    {
      const newNoteId = getRandomUuid();

      set((state) =>
      {
        state.editorState = {
          note: {
            content: "",
            fileId,
            id: newNoteId,
          },
          state: "create"
        };
      });
    },
    setEditNoteState: (note) =>
    {
      if(note == null)
      {
        console.error("Cannot set edit note state when note is null");
        return;
      }

      set((state) =>
      {
        state.editorState = {
          note,
          originalNote: note,
          state: "edit"
        };
      });
    },
    setViewNoteState: (note) =>
    {
      if(note == null)
      {
        console.error("Cannot set view note state when note is null");
        return;
      }

      set((state) =>
      {
        state.editorState = {
          note,
          state: "view"
        };
      });
    },
    updateNote: (noteUpdate) =>
    {
      set(({ editorState }) =>
      {
        if(editorState.state !== "edit" && editorState.state !== "create")
        {
          throw new Error("Cannot update note when editor is not in edit state");
        }

        editorState.note = {
          ...editorState.note,
          ...noteUpdate
        };
      });
    },
  }))
);

export default useNoteEditorStore;
