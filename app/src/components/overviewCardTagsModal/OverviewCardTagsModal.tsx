import { type IGenTags } from "@/services/graphql/__generated/sdk";

import { Title } from "@mantine/core";
import { type Maybe } from "@trpc/server";
import React, { type FunctionComponent } from "react";

import * as styles from "./../organisms/overviewCard/OverviewCard.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import Tag from "../atoms/tag/Tag";
import { Cross } from "../Icons/Cross";
import { Modal } from "../molecules/Modal/Modal";

interface OverviewCardTagsModalProps
{
  readonly close: () => void;
  readonly opened: boolean;
  readonly tags: Maybe<Array<Maybe<IGenTags>>> | undefined;
}

const OverviewCardTagsModal: FunctionComponent<OverviewCardTagsModalProps> = ({ close, opened, tags }) => 
{
  return (
    <>
      <Modal
        lockScroll={false}
        opened={opened}
        onClose={close}
        title={<><Title mb={24} order={3}>All tags</Title><span onClick={close}><Cross size={32}/></span></>}
        centered
        withCloseButton={false}
        closeOnClickOutside
        styles={{
          content: {
            borderRadius: 12,
            padding: 20
          },
          title: {
            position: "relative",
            span: {
              cursor: "pointer",
              position: "absolute",
              right: 0,
              top: 0
            },
            width: "100%"
          }
        }}>
        <div css={styles.tagsModal}>
          {tags && tags.length > 0 ? tags?.map((tag, tagIndex) => (
            <Tag key={tagIndex}>{tag?.tagName}</Tag>
          )) : <><BodyText styleType="body-01-medium">No tags assigned to this document</BodyText></>}
        </div>
         
      </Modal>
    </>
  );
};

export default OverviewCardTagsModal;
