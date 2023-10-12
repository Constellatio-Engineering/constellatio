import { type Note, type UploadedFile } from "@/db/schema";
import { getRandomUuid } from "@/utils/utils";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type NoteUpdate = Partial<Pick<Note, "content">>;
type NewNote = Pick<Note, "id" | "content" | "fileId">;

type EditorClosed = {
  state: "closed";
};

type EditNote = {
  originalNote: Note;
  parentFile: UploadedFile;
  state: "edit";
};

type CreateNote = {
  parentFile: (Omit<UploadedFile, "note"> & { note: NewNote });
  state: "create";
};

type ViewNote = {
  parentFile: UploadedFile;
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
  setCreateNoteState: (file: UploadedFile) => void;
  setEditNoteState: (file: UploadedFile) => void;
  setViewNoteState: (file: UploadedFile) => void;
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
        case "edit":
        {
          const { originalNote, parentFile: { note } } = editorState;
          let hasUnsavedChanges: boolean;

          if(originalNote == null && note?.content != null)
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
          console.error(`Unknown editor state: ${editorState}`);
          computedValues = { hasUnsavedChanges: false };
          break;
        }
      }

      return computedValues;
    },
    setCreateNoteState: (parentFile) =>
    {
      const newNoteId = getRandomUuid();

      set((state) =>
      {
        state.editorState = {
          parentFile: {
            ...parentFile,
            note: {
              content: "",
              fileId: parentFile.id,
              id: newNoteId,
            }
          },
          state: "create"
        };
      });
    },
    setEditNoteState: (parentFile) =>
    {
      set((state) =>
      {
        if(parentFile.note == null)
        {
          console.error("Cannot set edit note state when note is null");
          return;
        }

        state.editorState = {
          originalNote: parentFile.note,
          parentFile,
          state: "edit"
        };
      });
    },
    setViewNoteState: (parentFile) =>
    {
      if(parentFile.note == null)
      {
        console.error("Cannot set view note state when note is null");
        return;
      }

      set((state) =>
      {
        state.editorState = {
          parentFile,
          state: "view"
        };
      });
    },
    updateNote: (noteUpdate) =>
    {
      set(({ editorState }) =>
      {
        if(editorState.state !== "edit" || editorState.parentFile.note == null)
        {
          throw new Error("Cannot update note when editor is not in edit state or note is null");
        }

        editorState.parentFile.note = {
          ...editorState.parentFile.note,
          ...noteUpdate,
        };
      });
    },
  }))
);

export default useNoteEditorStore;
