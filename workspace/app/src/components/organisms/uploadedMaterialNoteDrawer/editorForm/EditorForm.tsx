import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Edit } from "@/components/Icons/Edit";
import { Trash } from "@/components/Icons/Trash";
import { RichtextEditorField } from "@/components/molecules/RichtextEditorField/RichtextEditorField";
import SlidingPanelFileTypeRow from "@/components/molecules/slidingPanelFileTypeRow/SlidingPanelFileTypeRow";
import MantineRichtextRenderer from "@/components/organisms/mantineRichtextRenderer/MantineRichtextRenderer";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import useUploadedFiles from "@/hooks/useUploadedFiles";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import useNoteEditorStore, { type EditorStateDrawerOpened } from "@/stores/noteEditor.store";
import { api } from "@/utils/api";

import React, { type FunctionComponent, useState } from "react";

import * as styles from "./EditorForm.styles";

import { type CreateNoteSchema } from "@/schemas/notes/createNote.schema";
import { type UpdateNoteSchema } from "@/schemas/notes/updateNote.schema";

interface EditorFormProps
{
  readonly editorState: EditorStateDrawerOpened;
  readonly onClose: () => void;
}

const EditorForm: FunctionComponent<EditorFormProps> = ({ editorState, onClose }) =>
{
  const { invalidateNotes } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { note, state } = editorState;
  const updateNoteInEditor = useNoteEditorStore(s => s.updateNote);
  const setEditNoteState = useNoteEditorStore(s => s.setEditNoteState);
  const { hasUnsavedChanges } = useNoteEditorStore(s => s.getComputedValues());
  const [shouldShowDeleteNoteWindow, setShouldShowDeleteNoteWindow] = useState<boolean>(false);
  const { uploadedFilesInSelectedFolder } = useUploadedFiles();
  const file = uploadedFilesInSelectedFolder?.find(file => file.id === note.fileId);

  const { mutateAsync: createNote } = api.notes.createNote.useMutation({
    onError: (error) => console.log("error while creating note", error),
    onSuccess: invalidateNotes
  });

  const { mutateAsync: updateNote } = api.notes.updateNote.useMutation({
    onError: (error) => console.log("error while updating note", error),
    onSuccess: invalidateNotes
  });

  const { mutate: deleteNote } = api.notes.deleteNote.useMutation({
    onError: (error) => console.log("error while deleting note", error),
    onSuccess: async () =>
    {
      await invalidateNotes();
      onClose();
    }
  });

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

  return (
    <>
      <SlidingPanelFileTypeRow
        variant="file"
        fileName={file?.originalFilename || ""}
        fileExtension={file?.fileExtension || ""}
      /> 
      <div className="form" css={styles.form}>
        {(editorState.state === "create" || editorState.state === "edit") && (
          <>
            <div css={styles.MaterialNoteRichText}>
              <RichtextEditorField
                content={note.content}
                onChange={e => updateNoteInEditor({
                  content: e.editor.getText().trim() === "" ? "" : e.editor.getHTML()
                })}
                variant="with-legal-quote"
              />
            </div>
            <div css={styles.MaterialNotesCallToAction}>
              <Button<"button">
                styleType="secondarySimple"
                onClick={onClose}>
                Abbrechen
              </Button>
              <Button<"button">
                styleType="primary"
                disabled={!hasUnsavedChanges}
                onClick={onSave}>
                Speichern
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
                <Edit/>{" "}Bearbeiten
              </Button>
              <Button<"button">
                styleType="secondarySubtle"
                onClick={() => setShouldShowDeleteNoteWindow(true)}>
                <Trash/>{" "}Löschen
              </Button>
            </div>
            <MantineRichtextRenderer htmlContent={note.content}/>
            {shouldShowDeleteNoteWindow && (
              <div className="deleteNoteBlock">
                <BodyText styleType="body-01-medium">Bist du sicher, dass du deine Notizen löschen möchtest?</BodyText>
                <div>
                  <Button<"button">
                    styleType="secondarySimple"
                    onClick={() => setShouldShowDeleteNoteWindow(false)}>
                    Nein, behalten
                  </Button>
                  <Button<"button">
                    styleType="primary"
                    onClick={() => deleteNote({ fileId: editorState.note.fileId })}>
                    Ja, löschen
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
