import { type Document } from "@/db/schema";
import { getRandomUuid } from "@/utils/utils";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type DocumentUpdate = Partial<Pick<Document, "name" | "content">>;
type NewDocument = Pick<Document, "name" | "content" | "id" | "folderId">;

type EditorClosed = {
  state: "closed";
};

type EditDocument = {
  document: Document;
  originalDocument: Document;
  state: "edit";
};

type CreateDocument = {
  document: NewDocument;
  state: "create";
};

type ViewDocument = {
  document: Document;
  state: "view";
};

export type EditorStateDrawerOpened = EditDocument | CreateDocument | ViewDocument;
type EditorState = EditorClosed | EditorStateDrawerOpened;

type ComputedEditorValues = {
  hasUnsavedChanges: boolean;
  title: string;
};

type DocumentEditorStoreProps = {
  closeEditor: () => void;
  editorState: EditorState;
  getComputedValues: () => ComputedEditorValues;
  setCreateDocumentState: (params: { folderId: string | null }) => void;
  setEditDocumentState: (document: Document) => void;
  setViewDocumentState: (document: Document) => void;
  updateEditorDocument: (documentUpdate: DocumentUpdate) => void;
};

const useDocumentEditorStore = create(
  immer<DocumentEditorStoreProps>((set, get) => ({
    closeEditor: () =>
    {
      set((state) =>
      {
        state.editorState = {
          state: "closed",
        };
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
            title: "",
          };
          break;
        }
        case "edit":
        {
          const hasUnsavedChanges = (editorState.document.name !== editorState.originalDocument.name) || (editorState.document.content !== editorState.originalDocument.content);

          computedValues = {
            hasUnsavedChanges,
            title: `Edit ${editorState.originalDocument.name}`,
          };

          break;
        }
        case "view":
        {
          computedValues = {
            hasUnsavedChanges: false,
            title: editorState.document.name,
          };
          break;
        }
        case "create":
        {
          computedValues = {
            hasUnsavedChanges: editorState.document.name !== "",
            title: "Create new Constellatio doc",
          };
          break;
        }
        default:
        {
          console.error(`Unknown editor state: ${editorState}`);
          computedValues = {
            hasUnsavedChanges: false,
            title: "",
          };
          break;
        }
      }

      return computedValues;
    },
    setCreateDocumentState: ({ folderId }) =>
    {
      const newDocumentId = getRandomUuid();

      set((state) =>
      {
        state.editorState = {
          document: {
            content: "",
            folderId,
            id: newDocumentId,
            name: "",
          },
          state: "create"
        };
      });
    },
    setEditDocumentState: (document) =>
    {
      set((state) =>
      {
        state.editorState = {
          document,
          originalDocument: document,
          state: "edit"
        };
      });
    },
    setViewDocumentState: (document) =>
    {
      set((state) =>
      {
        state.editorState = {
          document,
          state: "view"
        };
      });
    },
    updateEditorDocument: (documentUpdate) =>
    {
      set(({ editorState }) =>
      {
        if(editorState.state === "closed")
        {
          throw new Error("Cannot update editor document when editor is closed");
        }

        switch (editorState.state)
        {
          case "edit":
          {
            editorState.document = {
              ...editorState.document,
              ...documentUpdate
            };
            break;
          }
          case "create":
          {
            editorState.document = {
              ...editorState.document,
              ...documentUpdate
            };
            break;
          }
          default:
          {
            console.error(`Unknown editor state: ${editorState}`);
          }
        }
      });
    },
  }))
);

export default useDocumentEditorStore;
