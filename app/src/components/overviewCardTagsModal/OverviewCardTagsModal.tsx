import { type IGenTags } from "@/services/graphql/__generated/sdk";

import { Modal, Title } from "@mantine/core";
import { type Maybe } from "@trpc/server";
import React, { type FunctionComponent } from "react";

import * as styles from "./../organisms/overviewCard/OverviewCard.styles";
import Tag from "../atoms/tag/Tag";

interface OverviewCardTagsModalProps
{
  readonly close: () => void;
  readonly opened: boolean;
  readonly tags: Maybe<Array<Maybe<IGenTags>>> | undefined;
}

const OverviewCardTagsModal: FunctionComponent<OverviewCardTagsModalProps> = ({ close, opened, tags }) => 
{
  return (
    <Modal
      lockScroll={false}
      opened={opened}
      onClose={close}
      title={<Title order={3}>All tags</Title>}
      centered
      closeOnClickOutside
      styles={{
        content: {
          borderRadius: 12,
        }
      }}>
      <div css={styles.tagsModal}>
        {tags?.map((tag, tagIndex) => (
          <Tag key={tagIndex}>{tag?.tagName}</Tag>
        ))}
      </div>
    </Modal>
  );
};

export default OverviewCardTagsModal;
