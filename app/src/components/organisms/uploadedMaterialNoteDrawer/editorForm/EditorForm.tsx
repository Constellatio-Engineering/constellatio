import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Edit } from "@/components/Icons/Edit";
import { Trash } from "@/components/Icons/Trash";
import { RichtextEditorField } from "@/components/molecules/RichtextEditorField/RichtextEditorField";
import SlidingPanelFileTypeRow from "@/components/molecules/slidingPanelFileTypeRow/SlidingPanelFileTypeRow";
import { type Document } from "@/db/schema";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type CreateDocumentSchema } from "@/schemas/documents/createDocument.schema";
import { type UpdateDocumentSchema } from "@/schemas/documents/updateDocument.schema";
import { type CreateNoteSchema, type CreateOrUpdateNoteSchema } from "@/schemas/notes/createNote.schema";
import useNoteEditorStore from "@/stores/noteEditor.store";
import useDocumentEditorStore, { type EditorStateDrawerOpened } from "@/stores/noteEditor.store";
import { api } from "@/utils/api";

import React, { type FunctionComponent, useState } from "react";

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
  const { parentFile: { note }, state } = editorState;
  const updateNoteInEditor = useDocumentEditorStore(s => s.updateNote);
  const closeEditor = useDocumentEditorStore(s => s.closeEditor);
  const setEditNoteState = useDocumentEditorStore(s => s.setEditNoteState);
  const { hasUnsavedChanges } = useDocumentEditorStore(s => s.getComputedValues());
  const [shouldShowDeleteNoteWindow, setShouldShowDeleteNoteWindow] = useState<boolean>(false);

  const { mutateAsync: createNote } = api.notes.createNote.useMutation({
    onError: (error) => console.log("error while creating note", error),
    onSuccess: async (): Promise<void> => invalidateUploadedFiles({ folderId: selectedFolderId })
  });

  const { mutateAsync: updateNote } = api.notes.updateNote.useMutation({
    onError: (error) => console.log("error while updating note", error),
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

  const onSave2 = async (): Promise<void> =>
  {
    if(state !== "edit" && state !== "create")
    {
      console.error("Can only save when state is edit or create");
      return;
    }

    const noteUpdate: CreateOrUpdateNoteSchema = {
      content: note.content,
      fileId: note.fileId,
    };

    const [updatedNote] = await createNote(noteUpdate);

    if(!updatedNote)
    {
      console.error("Error while saving note, updatedNote is null");
      return;
    }

    updateNoteInEditor({ content: updatedNote.content });
  };

  const onSave = async (): Promise<void> =>
  {
    switch (state)
    {
      case "create":
      {
        const newNote: CreateNoteSchema = {
          content: note.content,
          fileId: note.fileId,
          id: note.id,
        };

        const [createdNote] = await createNote(newNote);

        if(!createdNote)
        {
          console.error("Error while creating note, note is null");
          return;
        }

        const editorState = useNoteEditorStore.getState().editorState.

          setEditNoteState(createdNote);
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

  /* const { mutate: deleteDocument } = api.documents.deleteDocument.useMutation({
    onError: (error) => console.error("Error while deleting document:", error),
    onSuccess: invalidateDocumentsForCurrentFolder,
  });*/

  // TODO: Validate the form

  console.log(editorState);

  return (
    <>
      <SlidingPanelFileTypeRow title="originalFilename" fileExtension="fileExtension"/>
      <div className="form">
        {(editorState.state === "create" || editorState.state === "edit") && (
          <>
            <div css={styles.MaterialNoteRichText}>
              <RichtextEditorField
                content={note.content}
                onChange={async (e) => updateNote({ content: e.editor.getText().trim() === "" ? "" : e.editor.getHTML() })}
                variant="with-legal-quote"
              />
            </div>
            <div css={styles.MaterialNotesCallToAction}>
              <Button<"button">
                styleType="secondarySimple"
                onClick={onCancel}>
                Cancel
              </Button>
              <Button<"button">
                styleType="primary"
                disabled={note.content === ""}
                onClick={onSave}>
                Save
              </Button>
            </div>
          </>
        )}
        {editorState.state === "view" && (
          <div css={styles.existingNote}>
            <div css={styles.existingNoteActions}>
              <Button<"button">
                styleType="secondarySubtle"
                onClick={() => {}}>
                <Edit/>{" "}Edit
              </Button>
              <Button<"button">
                styleType="secondarySubtle"
                onClick={() => setShouldShowDeleteNoteWindow(true)}>
                <Trash/>{" "}Delete
              </Button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: note.content }}/>
            {shouldShowDeleteNoteWindow && (
              <div className="deleteNoteBlock">
                <BodyText styleType="body-01-medium">Are you sure you want to delete your notes?</BodyText>
                <div>
                  <Button<"button">
                    styleType="secondarySimple"
                    onClick={() => setShouldShowDeleteNoteWindow(false)}>
                    No, keep
                  </Button>
                  <Button<"button">
                    styleType="primary"
                    onClick={() => {}}>
                    Yes, delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default EditorForm;
