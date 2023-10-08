import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { RichtextEditorField } from "@/components/molecules/RichtextEditorField/RichtextEditorField";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type CreateDocumentSchema } from "@/schemas/documents/createDocument.schema";
import { type UpdateDocumentSchema } from "@/schemas/documents/updateDocument.schema";
import useDocumentEditorStore, { type EditorStateDrawerOpened } from "@/stores/documentEditor.store";
import { api } from "@/utils/api";

import React, { type FunctionComponent } from "react";

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
  const invalidateDocumentsForCurrentFolder = async (): Promise<void> => invalidateDocuments({ folderId: document.folderId });

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

  // TODO: Validate the form

  return (
    <>
      <div className="form">
        {editorState.state === "view" && (
          <div dangerouslySetInnerHTML={{ __html: document.content }}/>
        )}
        {(editorState.state === "create" || editorState.state === "edit") && (
          <>
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
          </>
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
