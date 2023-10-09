import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { api } from "@/utils/api";

import { Menu, Modal, Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "../../components/molecules/uploadedMaterialTableBody/UploadedMaterialTableBody.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import { Button, type TButton } from "../atoms/Button/Button";
import { DropdownItem } from "../atoms/Dropdown/DropdownItem";
import { Cross } from "../Icons/Cross";
import { DotsIcon } from "../Icons/dots";
import { Edit } from "../Icons/Edit";
import { Trash } from "../Icons/Trash";

interface DelItemProps
{
  readonly file: {
    createdAt: Date;
    fileExtension: string;
    folderId: string | null;
    id: string;
    originalFilename: string;
    serverFilename: string;
    sizeInBytes: number;
    userId: string;
  }; 
}

const DelItem: FunctionComponent<DelItemProps> = ({ file }) => 
{
  const [showDeleteMaterialModal, setShowDeleteMaterialModal] = React.useState<boolean>(false);
  const { invalidateUploadedFiles } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { mutate: deleteFile } = api.uploads.deleteUploadedFiles.useMutation({
    onError: (e) => console.log("error while deleting file", e),
    onSuccess: async () => invalidateUploadedFiles()
  });
  return (
    <>
      <Menu shadow="elevation-big" radius="12px" width={200}>
        <Menu.Target>
          <td
            css={styles.callToActionCell}
            onClick={() => {}}>
            <button type="button">
              <DotsIcon/>
            </button>
          </td>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={() => setShowDeleteMaterialModal(true)}>
            <DropdownItem icon={<Edit/>} label="Rename"/>
          </Menu.Item>
          {/* <Menu.Divider/>
              <Menu.Item>
                <DropdownItem icon={<FolderIcon/>} label="Move to"/>
              </Menu.Item> */}
          {/* <Menu.Divider/>
              <Menu.Item>
                <DropdownItem icon={<DownloadIcon/>} label="Download"/>
              </Menu.Item> */}
          <Menu.Divider/>
          {/* <Menu.Item onClick={() => file && deleteFile({ fileIds: [file.id] })}><span className="label"><Trash/>Delete</span></Menu.Item> */}
          <Menu.Item onClick={() => setShowDeleteMaterialModal(true)}><DropdownItem icon={<Trash/>} label="Delete"/></Menu.Item>
        </Menu.Dropdown>
      </Menu>
      {/* POP UPS ------------------------------------------------------------------------------------- */}
      <Modal
        opened={showDeleteMaterialModal}
        withCloseButton={false}
        centered
        // styles={styles.modalStyles()}
        onClose={() => { setShowDeleteMaterialModal(false); }}>
        <span className="close-btn" onClick={() => setShowDeleteMaterialModal(false)}>
          <Cross size={32}/>
        </span>
        <Title order={3}>Delete folder</Title>
        <BodyText styleType="body-01-regular" component="p" className="delete-folder-text">Are you sure you want to delete <strong>Folder name</strong>?</BodyText>
        <div className="modal-call-to-action">
          <Button<"button">
            styleType={"secondarySimple" as TButton["styleType"]}
            onClick={() => setShowDeleteMaterialModal(false)}>
            No, Keep
          </Button>
          <Button<"button">
            styleType="primary"
            onClick={() => 
            {
              if(file) { deleteFile({ fileIds: [file.id] }); }
              setShowDeleteMaterialModal(false);
            }}>
            Yes, Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DelItem;
