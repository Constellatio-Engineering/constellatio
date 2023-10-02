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
  originalDocument: Document;
  selectedDocument: Document;
  state: "edit";
};

type CreateDocument = {
  newDocument: NewDocument;
  state: "create";
};

type EditorState = EditorClosed | EditDocument | CreateDocument;

type DocumentEditorStoreProps = {
  closeEditor: () => void;
  editorState: EditorState;
  getEditorDocumentValues: () => Document | NewDocument | null;
  setCreateDocumentState: (params: { folderId: string | null }) => void;
  setEditDocumentState: (document: Document) => void;
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
    getEditorDocumentValues: () =>
    {
      const { editorState } = get();

      switch (editorState.state)
      {
        case "closed":
        {
          return null;
        }
        case "edit":
        {
          return editorState.selectedDocument;
        }
        case "create":
        {
          return editorState.newDocument;
        }
        default:
        {
          console.error(`Unknown editor state: ${editorState}`);
          return null;
        }
      }
    },
    setCreateDocumentState: ({ folderId }) =>
    {
      const newDocumentId = getRandomUuid();

      set((state) =>
      {
        state.editorState = {
          newDocument: {
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
          originalDocument: document,
          selectedDocument: document,
          state: "edit"
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
            editorState.selectedDocument = {
              ...editorState.selectedDocument,
              ...documentUpdate
            };
            break;
          }
          case "create":
          {
            editorState.newDocument = {
              ...editorState.newDocument,
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
