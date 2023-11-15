import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import CustomRadio from "@/components/atoms/customRadio/CustomRadio";
import { FolderIcon } from "@/components/Icons/Folder";
import { Modal } from "@/components/molecules/Modal/Modal";
import useUploadFolders from "@/hooks/useUploadFolders";
import { defaultFolderName } from "@/utils/translations";

import { useMantineTheme } from "@mantine/core";
import React, { type FunctionComponent, useState } from "react";

import * as styles from "./MoveToModal.styles";

type Props = {
  readonly close: () => void;
  readonly currentFolderId: string | null;
  readonly isOpened: boolean;
  readonly onSubmit: (folderId: string | null) => void;
};

const MoveToModal: FunctionComponent<Props> = ({
  close,
  currentFolderId,
  isOpened,
  onSubmit
}) =>
{
  const { folders } = useUploadFolders();
  const theme = useMantineTheme();
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(currentFolderId);

  return (
    <Modal
      onClose={close}
      opened={isOpened}
      lockScroll={false}
      title="Datei verschieben nach"
      radius={12}
      styles={{
        body: {
          padding: "0"
        },
        close: {
          height: "32px",
          svg: {
            color: "black",
            height: "26px !important",
            width: "26px !important",
          },
          width: "32px",
        },
        title: {
          fontFamily: theme.headings.fontFamily,
          fontSize: theme.fontSizes["spacing-24"],
          fontWeight: 400,
          lineHeight: theme.spacing["spacing-36"],
        }
      }}
      centered>
      <div
        onClick={() => setSelectedFolderId(null)}
        css={styles.item({ selected: selectedFolderId === null, theme })}>
        <CustomRadio name="check" checked={selectedFolderId === null} onChange={() => setSelectedFolderId(null)}/>
        <FolderIcon/>
        <BodyText styleType="body-01-medium" htmlFor="check1" component="label">{defaultFolderName}</BodyText>
      </div>
      {folders.map((folder) =>
      {
        const isChecked = selectedFolderId === folder.id;

        return (
          <div
            key={folder.id}
            onClick={() => setSelectedFolderId(folder.id)}
            css={styles.item({ selected: isChecked, theme })}>
            <CustomRadio name="check" checked={isChecked} onChange={() => setSelectedFolderId(folder.id)}/>
            <FolderIcon/>
            <BodyText styleType="body-01-medium" htmlFor="check1" component="label">{folder.name}</BodyText>
          </div>
        );
      })}
      <div css={styles.callToAction}>
        <Button<"button">
          styleType="secondarySimple"
          size="large"
          onClick={close}>
          Abbrechen
        </Button>
        <Button<"button">
          styleType="primary"
          size="large"
          disabled={selectedFolderId === undefined || selectedFolderId === currentFolderId}
          onClick={() => onSubmit(selectedFolderId)}>
          Verschieben
        </Button>
      </div>
    </Modal>
  );
};

export default MoveToModal;
