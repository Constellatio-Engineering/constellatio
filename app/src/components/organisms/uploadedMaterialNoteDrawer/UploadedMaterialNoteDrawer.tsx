
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Edit } from "@/components/Icons/Edit";
import { Trash } from "@/components/Icons/Trash";
import { RichtextEditorField } from "@/components/molecules/RichtextEditorField/RichtextEditorField";
import SlidingPanelFileTypeRow from "@/components/molecules/slidingPanelFileTypeRow/SlidingPanelFileTypeRow";
import SlidingPanelTitle from "@/components/molecules/slidingPanelTitle/SlidingPanelTitle";
import { type UploadedFile } from "@/db/schema";

import { Drawer } from "@mantine/core";
import React, { type Dispatch, type FunctionComponent } from "react";

import * as styles from "./UploadedMaterialNoteDrawer.styles";

interface UploadedMaterialNoteDrawerProps
{
  readonly noteRichtext: string;
  readonly selectedFileNote: UploadedFile | undefined;
  readonly setNoteRichtext: Dispatch<React.SetStateAction<string>>;
  readonly setShowNoteDrawer: Dispatch<React.SetStateAction<boolean>>;
  readonly showNoteDrawer: boolean;
}

const UploadedMaterialNoteDrawer: FunctionComponent<UploadedMaterialNoteDrawerProps> = ({
  noteRichtext,
  selectedFileNote,
  setNoteRichtext,
  setShowNoteDrawer,
  showNoteDrawer
}) => 
{
  const isNoteExists = true;
  const [showDeleteNoteWindow, setShowDeleteNoteWindow] = React.useState(false);
  return (
    <Drawer
      lockScroll={false}
      opened={showNoteDrawer}
      onClose={() => setShowNoteDrawer(false)}
      withCloseButton={false}
      position="right"
      size="xl"
      styles={styles.drawerStyles()}
      title={(
        <SlidingPanelTitle
          title="Notes"
          variant="default"
          closeButtonAction={() => 
          {
            setShowNoteDrawer(false);
          }}
        />
      )}>
      <SlidingPanelFileTypeRow title={selectedFileNote?.originalFilename ?? ""} fileExtension={selectedFileNote?.fileExtension ?? ""}/>
      {!isNoteExists && (
        <>
          <div css={styles.MaterialNoteRichText}>
            <RichtextEditorField
              content={noteRichtext}
              onChange={(e) => 
              {
                if(e.editor.getText().trim() === "")
                {
                  setNoteRichtext("");
                }
                else 
                {
                  setNoteRichtext(e.editor.getHTML());
                }
              }}
              variant="with-legal-quote"
            />
          </div>
          <div css={styles.MaterialNotesCallToAction}>
            <Button<"button">
              styleType="secondarySimple"
              onClick={() => setShowNoteDrawer(false)}>
              Cancel
            </Button>
            <Button<"button">
              styleType="primary"
              disabled={noteRichtext === "" ? true : false}
              onClick={() => 
              {
                alert(noteRichtext);
              }}>
              Save
            </Button>
          </div>
        </>
      )}
      {
        isNoteExists && (
          <>
            {/* selectedFileNote.note */}
            <div css={styles.existingNote}>
              <div css={styles.existingNoteActions}>
                <Button<"button">
                  styleType="secondarySubtle"
                  onClick={() => {}}>
                  <Edit/>{" "}Edit
                </Button>
                <Button<"button">
                  styleType="secondarySubtle"
                  onClick={() => 
                  {
                    setShowDeleteNoteWindow(true);
                  }}>
                  <Trash/>{" "}Delete
                </Button>
              </div>
              <div dangerouslySetInnerHTML={{ __html: "The Note" }}/>
              {showDeleteNoteWindow && (
                <div className="deleteNoteBlock">
                  <BodyText styleType="body-01-medium">Are you sure you want to delete your notes?</BodyText>
                  <div>
                    <Button<"button">
                      styleType="secondarySimple"
                      onClick={() => setShowDeleteNoteWindow(false)}>
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
          
          </>
        )
      }
    </Drawer>
  );
};

export default UploadedMaterialNoteDrawer;
