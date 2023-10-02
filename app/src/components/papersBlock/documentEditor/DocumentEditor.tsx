import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import SlidingPanelTitle from "@/components/molecules/slidingPanelTitle/SlidingPanelTitle";
import * as styles from "@/components/papersBlock/PapersBlock.styles";
import { type CreateDocumentSchema } from "@/schemas/documents/createDocument.schema";
import { type UpdateDocumentSchema } from "@/schemas/documents/updateDocument.schema";
import useDocumentEditorStore from "@/stores/documentEditor.store";
import { api } from "@/utils/api";

import { Drawer, ScrollArea } from "@mantine/core";
import React, { type FunctionComponent } from "react";

interface DocumentEditorProps {}

const DocumentEditor: FunctionComponent<DocumentEditorProps> = () =>
{
  const apiContext = api.useContext();
  const onSuccessfulMutation = async (): Promise<void> => apiContext.documents.getDocuments.invalidate();

  const { mutate: createDocument } = api.documents.createDocument.useMutation({
    onError: (error) => console.log("error while creating document", error),
    onSuccess: onSuccessfulMutation
  });
  const { mutate: updateDocument } = api.documents.updateDocument.useMutation({
    onError: (error) => console.log("error while updating document", error),
    onSuccess: onSuccessfulMutation
  });
  const editorState = useDocumentEditorStore(s => s.editorState);
  const updateEditorDocument = useDocumentEditorStore(s => s.updateEditorDocument);
  const closeEditor = useDocumentEditorStore(s => s.closeEditor);
  const editorValues = useDocumentEditorStore(s => s.getEditorDocumentValues());

  let hasUnsavedChanges = false;

  if(editorValues == null || editorState.state === "closed")
  {
    hasUnsavedChanges = false;
  }
  else
  {
    if(editorState.state === "edit")
    {
      hasUnsavedChanges = (editorValues.name !== editorState.originalDocument.name) || (editorValues.content !== editorState.originalDocument.content);
    }
    else if(editorState.state === "create")
    {
      hasUnsavedChanges = editorValues.name !== "" || editorValues.content !== "";
    }
  }

  // TODO: Validate the form

  return (
    <Drawer
      opened={editorState.state !== "closed"}
      onClose={closeEditor}
      title={<SlidingPanelTitle title="Create Constellatio doc" variant="default" closeButtonAction={closeEditor}/>}
      position="right"
      withCloseButton={false}
      size="xl"
      scrollAreaComponent={ScrollArea.Autosize}
      styles={styles.drawerStyles()}>
      {editorValues && (
        <div className="form">
          <Input
            label="Doc name"
            inputType="text"
            value={editorValues.name}
            onChange={(e) => updateEditorDocument({ name: e.target.value })}
          />
          <Input
            label="Doc content"
            inputType="text"
            value={editorValues.content}
            onChange={(e) => updateEditorDocument({ content: e.target.value })}
          />
          {/* TODO: We need a Richtext Editor component with a onChange */}
          {/* <RichtextEditorField
          variant="with-legal-quote"
          content={content}
          onChange={(e) => updateEditorDocument({ content: e.target.value })}
        />*/}
        </div>
      )}
      <div className="call-to-action">
        <Button<"button">
          styleType="secondarySimple"
          onClick={() =>
          {
            if(!editorValues)
            {
              closeEditor();
              return;
            }

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
          }}>
          Cancel
        </Button>
        <Button<"button">
          styleType="primary"
          disabled={!hasUnsavedChanges}
          onClick={() =>
          {
            if(editorState.state === "closed" || !editorValues)
            {
              return;
            }
            else if(editorState.state === "create")
            {
              const newDocument: CreateDocumentSchema = {
                content: editorValues.content,
                folderId: editorValues.folderId,
                id: editorValues.id,
                name: editorValues.name,
              };

              createDocument(newDocument);
            }
            else
            {
              const documentUpdate: UpdateDocumentSchema = {
                content: editorValues.content,
                id: editorValues.id,
                name: editorValues.name,
              };

              updateDocument(documentUpdate);
            }
          }}>
          Save
        </Button>
      </div>
    </Drawer>
  );
};

export default DocumentEditor;
