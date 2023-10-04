import { type UploadedFile } from "@/db/schema";

import { Drawer } from "@mantine/core";
import React, { type Dispatch, type FunctionComponent } from "react";

import * as styles from "./UploadedMaterialNoteDrawer.styles";
import { Button } from "../atoms/Button/Button";
import { RichtextEditorField } from "../molecules/RichtextEditorField/RichtextEditorField";
import SlidingPanelTitle from "../molecules/slidingPanelTitle/SlidingPanelTitle";
import SlidingPanelFileTypeRow from "../slidingPanelFileTypeRow/SlidingPanelFileTypeRow";

interface UploadedMaterialNoteDrawerProps
{
  readonly noteRichtext: string;
  readonly selectedFileNote: UploadedFile | undefined;
  readonly setNoteRichtext: Dispatch<React.SetStateAction<string>>;
  readonly setShowNoteDrewer: Dispatch<React.SetStateAction<boolean>>;
  readonly showNoteDrewer: boolean;
}

const UploadedMaterialNoteDrawer: FunctionComponent<UploadedMaterialNoteDrawerProps> = ({
  noteRichtext,
  selectedFileNote,
  setNoteRichtext,
  setShowNoteDrewer,
  showNoteDrewer
}) => 
{
  return (
    <Drawer
      opened={showNoteDrewer}
      onClose={() => setShowNoteDrewer(false)}
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
            setShowNoteDrewer(false);
          }}
        />
      )}>
      <SlidingPanelFileTypeRow title={selectedFileNote?.originalFilename ?? ""} fileExtention={selectedFileNote?.fileExtension ?? ""}/>
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
          onClick={() => setShowNoteDrewer(false)}>
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
    </Drawer>
  );
};

export default UploadedMaterialNoteDrawer;
