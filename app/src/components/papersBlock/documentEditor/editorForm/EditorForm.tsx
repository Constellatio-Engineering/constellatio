import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Edit } from "@/components/Icons/Edit";
import { Trash } from "@/components/Icons/Trash";
import { RichtextEditorField } from "@/components/molecules/RichtextEditorField/RichtextEditorField";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type CreateDocumentSchema } from "@/schemas/documents/createDocument.schema";
import { type UpdateDocumentSchema } from "@/schemas/documents/updateDocument.schema";
import useDocumentEditorStore, { type EditorStateDrawerOpened } from "@/stores/documentEditor.store";
import { api } from "@/utils/api";

import React, { type FunctionComponent } from "react";

import * as styles from "./EditorForm.styles";
interface EditorFormProps
{
  readonly editorState: EditorStateDrawerOpened;
}
const EditorForm: FunctionComponent<EditorFormProps> = ({ editorState }) =>
{
  const { invalidateDocuments } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { document, state } = editorState;
  const updateEditorDocument = useDocumentEditorStore(s => s.updateEditorDocument);
  const closeEditor = useDocumentEditorStore(s => s.closeEditor);
  const setEditDocumentState = useDocumentEditorStore(s => s.setEditDocumentState);
  const { hasUnsavedChanges } = useDocumentEditorStore(s => s.getComputedValues());
  const invalidateDocumentsForCurrentFolder = async (): Promise<void> => invalidateDocuments({ folderId: document.folderId as string });
  const { mutateAsync: createDocument } = api.documents.createDocument.useMutation({
    onError: (error) => console.log("error while creating document", error),
    onSuccess: invalidateDocumentsForCurrentFolder
  });
  const { mutateAsync: updateDocument } = api.documents.updateDocument.useMutation({
    onError: (error) => console.log("error while updating document", error),
    onSuccess: invalidateDocumentsForCurrentFolder
  });
  const onCancel = (): void =>
  {
    if(!hasUnsavedChanges)
    {
      closeEditor();
      return;
    }

    const shouldDiscardChanges = window.confirm("Are you sure you want to discard your changes?");

    if(!shouldDiscardChanges)
    {
      return;
    }

    closeEditor();
  };
  const onSave = async (): Promise<void> =>
  {
    switch (state)
    {
      case "create":
      {
        const newDocument: CreateDocumentSchema = {
          content: document.content,
          folderId: document.folderId,
          id: document.id,
          name: document.name,
        };

        const [createdDocument] = await createDocument(newDocument);

        if(!createdDocument)
        {
          console.error("Error while creating document, createdDocument is null");
          return;
        }

        setEditDocumentState(createdDocument);
        closeEditor();
        break;
      }
      case "edit":
      {
        // TODO : SHOULDN'T THE UpdatedAt BE UPDATED HERE?
        const documentUpdate: UpdateDocumentSchema = {
          content: document.content,
          id: document.id,
          name: document.name,
        };

        const [updatedDocument] = await updateDocument(documentUpdate);

        if(!updatedDocument)
        {
          console.error("Error while updating document, updatedDocument is null");
          return;
        }

        setEditDocumentState(updatedDocument);
        // closeEditor();
        break;
      }
      default:
      {
        console.error("Unknown editor state", editorState);
      }
    }
  };
  const { mutate: deleteDocument } = api.documents.deleteDocument.useMutation({
    onError: (error) => console.error("Error while deleting document:", error),
    onSuccess: invalidateDocumentsForCurrentFolder,
  });
  const [showConfirmDeleteDocWindow, setShowConfirmDeleteDocWindow] = React.useState<boolean>(false);
  return (
    <>
      <div className="form">
        {editorState.state === "view" && (
          <>
            <div css={styles.existingNote}>
              <div css={styles.existingNoteActions}>
                <Button<"button">
                  styleType="secondarySubtle"
                  onClick={() => 
                  {
                    // TODO : FIX : DOCUMENT TYPE DOESN'T MATCH EDITDOCUMENTSTATE TYPE

                    // setEditDocumentState({ 
                    //   content: document.content, 
                    //   // createdAt: document., 
                    //   folderId: document?.folderId, 
                    //   id: document?.id, 
                    //   name: document?.name, 
                    //   // updatedAt: new Date(), 
                    //   // userId: "" 
                    // });
                  }}>
                  <Edit/>{" "}Edit
                </Button>
                <Button<"button">
                  styleType="secondarySubtle"
                  onClick={() => setShowConfirmDeleteDocWindow(true)}>
                  <Trash/>{" "}Delete
                </Button>
              </div>
              <div css={styles.docContent} dangerouslySetInnerHTML={{ __html: document.content }}/>
              {showConfirmDeleteDocWindow && (
                <div css={styles.deleteDocWindow}>
                  <BodyText styleType="body-01-medium">Are you sure you want to delete this document?</BodyText>
                  <div>
                    <Button<"button"> styleType="secondarySimple" onClick={() => setShowConfirmDeleteDocWindow(false)}>No, keep</Button>
                    <Button<"button">
                      styleType="primary"
                      onClick={() => 
                      {
                        deleteDocument({ id: document?.id });
                        closeEditor();
                      }}>Yes, delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {(editorState.state === "create" || editorState.state === "edit") && (
          <div css={styles.createDocForm}>
            <Input
              label="Doc name"
              inputType="text"
              value={document.name}
              onChange={(e) => updateEditorDocument({ name: e.target.value })}
            />
            <RichtextEditorField
              variant="with-legal-quote"
              content={document.content}
              onChange={(e) => updateEditorDocument({ content: e.editor.getHTML() })}
            />
          </div>
        )}
      </div>
      <div className="call-to-action">
        <Button<"button">
          styleType="secondarySimple"
          onClick={onCancel}>
          Cancel
        </Button>
        <Button<"button">
          styleType="primary"
          disabled={!hasUnsavedChanges}
          onClick={onSave}>
          Save
        </Button>
      </div>
    </>
  );
};

export default EditorForm;
