import { BodyText } from "@/components/atoms/BodyText/BodyText";
import Tag from "@/components/atoms/tag/Tag";
import { Modal } from "@/components/molecules/Modal/Modal";

import { type IGenTags, type Maybe } from "@constellatio/cms/generated-types";
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
  const tagsWithNames = tags?.filter(Boolean).filter(tag => Boolean(tag.tagName)) ?? [];

  return (
    <Modal
      lockScroll={false}
      opened={opened}
      onClose={close}
      centered
      size="lg"
      title="Alle Tags"
      withCloseButton
      closeOnClickOutside>
      <div css={styles.tagsModal}>
        {tagsWithNames.length > 0 ? tagsWithNames.map(tag => (
          <Tag key={tag.id} title={tag.tagName!}/>
        )) : (
          <BodyText styleType="body-01-medium">Diesem Dokument wurden bisher keine Tags zugewiesen.</BodyText>
        )}
      </div>
    </Modal>
  );
};

export default OverviewCardTagsModal;
