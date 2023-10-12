import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Edit } from "@/components/Icons/Edit";
import { Trash } from "@/components/Icons/Trash";
import { RichtextEditorField } from "@/components/molecules/RichtextEditorField/RichtextEditorField";
import SlidingPanelFileTypeRow from "@/components/molecules/slidingPanelFileTypeRow/SlidingPanelFileTypeRow";
import { type Note } from "@/db/schema";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type UpdateDocumentSchema } from "@/schemas/documents/updateDocument.schema";
import { type CreateNoteSchema } from "@/schemas/notes/createNote.schema";
import { type UpdateNoteSchema } from "@/schemas/notes/updateNote.schema";
import useNoteEditorStore, { type EditorStateDrawerOpened } from "@/stores/noteEditor.store";
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
  const { invalidateNotes } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { note, state } = editorState;
  const updateNoteInEditor = useNoteEditorStore(s => s.updateNote);
  const closeEditor = useNoteEditorStore(s => s.closeEditor);
  const setEditNoteState = useNoteEditorStore(s => s.setEditNoteState);
  const { hasUnsavedChanges } = useNoteEditorStore(s => s.getComputedValues());
  const [shouldShowDeleteNoteWindow, setShouldShowDeleteNoteWindow] = useState<boolean>(false);
  const _invalidateNotes = async (): Promise<void> => invalidateNotes({ folderId: selectedFolderId });

  const { mutateAsync: createNote } = api.notes.createNote.useMutation({
    onError: (error) => console.log("error while creating note", error),
    onSuccess: _invalidateNotes
  });

  const { mutateAsync: updateNote } = api.notes.updateNote.useMutation({
    onError: (error) => console.log("error while updating note", error),
    onSuccess: _invalidateNotes
  });

  const { mutate: deleteNote } = api.notes.deleteNote.useMutation({
    onError: (error) => console.log("error while deleting note", error),
    onSuccess: async () =>
    {
      await _invalidateNotes();
      closeEditor();
    }
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

        setEditNoteState(createdNote);
        break;
      }
      case "edit":
      {
        const noteUpdate: UpdateNoteSchema = {
          fileId: note.fileId,
          updatedValues: {
            content: note.content,
          }
        };

        const [updatedNote] = await updateNote(noteUpdate);

        if(!updatedNote)
        {
          console.error("Error while updating note, updatedNote is null");
          return;
        }

        setEditNoteState(updatedNote);
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
      <SlidingPanelFileTypeRow title="originalFilename" fileExtension="fileExtension"/>
      <div className="form">
        {(editorState.state === "create" || editorState.state === "edit") && (
          <>
            <div css={styles.MaterialNoteRichText}>
              <RichtextEditorField
                content={note.content}
                onChange={e => updateNoteInEditor({ content: e.editor.getText().trim() === "" ? "" : e.editor.getHTML() })}
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
                disabled={!hasUnsavedChanges}
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
                onClick={() => setEditNoteState(editorState.note)}>
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
                    onClick={() => deleteNote({ fileId: editorState.note.fileId })}>
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
