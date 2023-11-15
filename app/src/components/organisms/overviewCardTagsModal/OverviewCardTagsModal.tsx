import { BodyText } from "@/components/atoms/BodyText/BodyText";
import Tag from "@/components/atoms/tag/Tag";
import { Modal } from "@/components/molecules/Modal/Modal";
import { type IGenTags } from "@/services/graphql/__generated/sdk";

import { type Maybe } from "@trpc/server";
import React, { type FunctionComponent } from "react";

import * as styles from "../../organisms/overviewCard/OverviewCard.styles";

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
        centered
        title="Alle Tags"
        withCloseButton
        closeOnClickOutside>
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
