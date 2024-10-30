import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Edit } from "@/components/Icons/Edit";
import { Trash } from "@/components/Icons/Trash";
import { RichtextEditorField } from "@/components/molecules/RichtextEditorField/RichtextEditorField";
import MantineRichtextRenderer from "@/components/organisms/mantineRichtextRenderer/MantineRichtextRenderer";
import { useDataLossProtection } from "@/hooks/useDataLossProtection";
import { useOnDocumentMutation } from "@/hooks/useOnDocumentMutation";
import useDocumentEditorStore, { type EditorStateDrawerOpened } from "@/stores/documentEditor.store";
import { api } from "@/utils/api";

import React, { type FunctionComponent, useCallback } from "react";

import * as styles from "./EditorForm.styles";

import { type CreateDocumentSchema } from "@/schemas/documents/createDocument.schema";
import { type UpdateDocumentSchema } from "@/schemas/documents/updateDocument.schema";

interface EditorFormProps
{
  readonly editorState: EditorStateDrawerOpened;
  readonly onClose: () => void;
}

const EditorForm: FunctionComponent<EditorFormProps> = ({ editorState, onClose }) =>
{
  const { document: openedDocument } = editorState;
  const updateEditorDocument = useDocumentEditorStore(s => s.updateEditorDocument);
  const setEditDocumentState = useDocumentEditorStore(s => s.setEditDocumentState);
  const { hasUnsavedChanges } = useDocumentEditorStore(s => s.getComputedValues());
  const [showConfirmDeleteDocWindow, setShowConfirmDeleteDocWindow] = React.useState<boolean>(false);
  const { onDocumentMutation } = useOnDocumentMutation();
  useDataLossProtection(hasUnsavedChanges);

  const { mutateAsync: createDocument } = api.documents.createDocument.useMutation({
    onError: (error) => console.log("error while creating document", error),
    onSuccess: onDocumentMutation
  });

  const { mutateAsync: updateDocument } = api.documents.updateDocument.useMutation({
    onError: (error) => console.log("error while updating document", error),
    onSuccess: onDocumentMutation
  });

  const { mutate: deleteDocument } = api.documents.deleteDocument.useMutation({
    onMutate: (error) => console.log("deleting document", error),
    onSuccess: onDocumentMutation,
  });

  const onSave = useCallback(async (): Promise<void> =>
  {
    const documentEditorState = useDocumentEditorStore.getState();
    const { setEditDocumentState } = documentEditorState;
    const { document, state } = documentEditorState.editorState as EditorStateDrawerOpened;

    switch (state)
    {
      case "create":
      {
        const newDocument: CreateDocumentSchema = {
          content: document.content,
          folderId: document.folderId,
          id: document.id,
          name: document.name.trim(),
        };

        const [createdDocument] = await createDocument(newDocument);

        if(!createdDocument)
        {
          console.error("Error while creating document, createdDocument is null");
          return;
        }

        setEditDocumentState(createdDocument);
        onClose();
        break;
      }
      case "edit":
      {
        const documentUpdate: UpdateDocumentSchema = {
          id: document.id,
          updatedValues: {
            content: document.content,
            name: document.name,
          },
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
        console.error("Unknown editor state", state);
      }
    }
  }, [onClose, createDocument, updateDocument]);

  return (
    <>
      <div className="form" style={{ height: "100%" }}>
        {editorState.state === "view" && (
          <>
            <div css={styles.existingNote}>
              <div css={styles.existingNoteActions}>
                <Button<"button">
                  styleType="secondarySubtle"
                  onClick={() => setEditDocumentState(editorState.document)}>
                  <Edit/>{" "}Bearbeiten
                </Button>
                <Button<"button">
                  styleType="secondarySubtle"
                  onClick={() => setShowConfirmDeleteDocWindow(true)}>
                  <Trash/>{" "}Löschen
                </Button>
              </div>
              <div css={styles.contentWrapper}>
                <MantineRichtextRenderer htmlContent={openedDocument.content}/>
              </div>
              {showConfirmDeleteDocWindow && (
                <div css={styles.deleteDocWindow}>
                  <BodyText styleType="body-01-medium">Bist du sicher, dass du dieses Dokument löschen möchtest?</BodyText>
                  <div>
                    <Button<"button"> styleType="secondarySimple" onClick={() => setShowConfirmDeleteDocWindow(false)}>Nein, behalten</Button>
                    <Button<"button">
                      styleType="primary"
                      onClick={() => 
                      {
                        deleteDocument({ id: openedDocument?.id });
                        onClose();
                      }}>Ja, löschen
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
              label="Name"
              inputType="text"
              value={openedDocument.name}
              onKeyDown={(e) =>
              {
                if(e.key === "Tab")
                {
                  const richtextEditor = Array.from(document.getElementsByClassName("tiptap ProseMirror"))[0] as HTMLDivElement | undefined;

                  if(richtextEditor)
                  {
                    e.preventDefault();
                    richtextEditor.focus();
                  }
                }
              }}
              onChange={(e) => updateEditorDocument({ name: e.target.value })}
            />
            <RichtextEditorField
              variant="with-legal-quote"
              content={openedDocument.content}
              onChange={(e) => updateEditorDocument({ content: e.editor.getHTML() })}
            />
          </div>
        )}
      </div>
      {(editorState.state === "create" || editorState.state === "edit") && (
        <div className="call-to-action">
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
      )}
    </>
  );
};

export default EditorForm;
