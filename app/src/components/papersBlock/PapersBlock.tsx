import { Drawer, ScrollArea, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { type FunctionComponent, useState } from "react";

import * as styles from "./PapersBlock.styles";
import { Button } from "../atoms/Button/Button";
import { Input } from "../atoms/Input/Input";
import { NoteIcon } from "../Icons/Note";
import { RichtextEditorField } from "../molecules/RichtextEditorField/RichtextEditorField";
import SlidingPanelTitle from "../molecules/slidingPanelTitle/SlidingPanelTitle";
import DocsTable from "../organisms/docsTable/DocsTable";
import { type IDoc } from "../organisms/docsTable/DocTableData";
import EmptyStateCard from "../organisms/emptyStateCard/EmptyStateCard";

interface PapersBlockProps
{
  readonly docs?: IDoc[];
}

const PapersBlock: FunctionComponent<PapersBlockProps> = (props) => 
{
  const [opened, { close, open }] = useDisclosure(false);
  const [newDoc, setNewDoc] = useState<IDoc>({
    body: "", name: ""
  });

  return (
    <div css={styles.wrapper}>
      <Drawer
        opened={opened}
        onClose={close}
        title={<SlidingPanelTitle title="Create Constellatio doc" variant="default" closeButtonAction={() => close()}/>}
        position="right"
        withCloseButton={false}
        size="xl"
        scrollAreaComponent={ScrollArea.Autosize}
        styles={styles.drawerStyles()}>
        <div className="form">
          <Input
            label="Doc name"
            inputType="text"
            value={newDoc.name}
            onChange={(e) => setNewDoc(prev => ({ ...prev, name: e.target.value }))}
          />
          <RichtextEditorField
            variant="with-legal-quote"
            content=""
           
          />
        </div>
        <div className="call-to-action">
          <Button<"button"> styleType="secondarySimple" onClick={() => close()}>Cancel</Button>
          <Button<"button"> styleType="primary" disabled>Save</Button>
        </div>
      </Drawer>
      <div css={styles.papersBlockHead}>
        <Title order={4}>Constellatio docs <span className="count">({props?.docs?.length ?? 0})</span></Title>
        <Button<"button">
          styleType="secondarySimple" 
          leftIcon={<NoteIcon/>}
          onClick={() => open()}> Create doc
        </Button>
      </div>
      {
        props?.docs?.length ? (
          <div css={styles.papersBlockTable}>
            <DocsTable {...props}/> 
          </div>
        ) : 
          (
            <EmptyStateCard 
              variant="For-small-areas" 
              title="You haven’t created any docs yet"
              text="Constellatio docs are text documents where you leave your notes, summaries, etc"
            />
          )
      }
    </div>
  );
};

export default PapersBlock;
