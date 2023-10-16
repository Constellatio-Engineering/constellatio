import { type IGenTags } from "@/services/graphql/__generated/sdk";

import { Title } from "@mantine/core";
import { type Maybe } from "@trpc/server";
import React, { type FunctionComponent } from "react";

import * as styles from "./../organisms/overviewCard/OverviewCard.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import Tag from "../atoms/tag/Tag";
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
        title={<Title order={3}>All tags</Title>}
        centered
        size="xl"
        closeOnClickOutside
        styles={{
          content: {
            borderRadius: 12,
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
