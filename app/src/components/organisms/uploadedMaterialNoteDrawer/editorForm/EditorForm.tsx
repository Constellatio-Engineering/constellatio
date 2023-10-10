import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Edit } from "@/components/Icons/Edit";
import { Trash } from "@/components/Icons/Trash";
import { RichtextEditorField } from "@/components/molecules/RichtextEditorField/RichtextEditorField";
import { type Document } from "@/db/schema";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type CreateDocumentSchema } from "@/schemas/documents/createDocument.schema";
import { type UpdateDocumentSchema } from "@/schemas/documents/updateDocument.schema";
import { type CreateOrUpdateNoteSchema } from "@/schemas/notes/createOrUpdateNote.schema";
import useDocumentEditorStore, { type EditorStateDrawerOpened } from "@/stores/noteEditor.store";
import { api } from "@/utils/api";

import React, { type FunctionComponent } from "react";

import * as styles from "./EditorForm.styles";

interface EditorFormProps
{
  readonly editorState: EditorStateDrawerOpened;
  readonly selectedFolderId: string | null;
}

const EditorForm: FunctionComponent<EditorFormProps> = ({ editorState, selectedFolderId }) =>
{
  // const editorState = useDocumentEditorStore(s => s.editorState);

  const { invalidateUploadedFiles } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { note, state } = editorState;
  const updateNote = useDocumentEditorStore(s => s.updateNote);
  const closeEditor = useDocumentEditorStore(s => s.closeEditor);
  const setEditNoteState = useDocumentEditorStore(s => s.setEditNoteState);
  const { hasUnsavedChanges } = useDocumentEditorStore(s => s.getComputedValues());

  const { mutateAsync: createOrUpdateNote } = api.notes.createOrUpdateNote.useMutation({
    onError: (error) => console.log("error while saving note", error),
    onSuccess: async (): Promise<void> => invalidateUploadedFiles({ folderId: selectedFolderId })
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
    if(state !== "edit")
    {
      console.error("Can only save when state is edit");
      return;
    }

    const noteUpdate: CreateOrUpdateNoteSchema = {
      content: note.content,
      fileId: note.fileId,
    };

    const [updatedNote] = await createOrUpdateNote(noteUpdate);

    if(!updatedNote)
    {
      console.error("Error while saving note, updatedNote is null");
      return;
    }

    setEditNoteState(updatedNote);
  };

  /* const { mutate: deleteDocument } = api.documents.deleteDocument.useMutation({
    onError: (error) => console.error("Error while deleting document:", error),
    onSuccess: invalidateDocumentsForCurrentFolder,
  });*/

  // TODO: Validate the form

  return (
    <>
      <div className="form">
        {editorState.state === "view" && (
          <>

            <div css={styles.existingNote}>
              <div css={styles.existingNoteActions}>
                <Button<"button">
                  styleType="secondarySubtle"
                  onClick={() => setEditDocumentState(document as Document)}>
                  <Edit/> Edit
                </Button>
                <Button<"button">
                  styleType="secondarySubtle"
                  onClick={() => 
                  {
                    deleteDocument({ id: document?.id });
                    closeEditor();
                  }}>
                  <Trash/> Delete
                </Button>
              </div>
              <div dangerouslySetInnerHTML={{ __html: document.content }}/>
            </div>
          </>
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
