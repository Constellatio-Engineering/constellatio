/* eslint-disable max-lines */
import ProfilePicture from "@/components/molecules/profilePicture/ProfilePicture";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { api } from "@/utils/api";
import { getRandomUuid } from "@/utils/utils";

import { Modal, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { type FunctionComponent, useEffect, useState } from "react";

import * as styles from "./EditProfileImgModal.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import { Button } from "../atoms/Button/Button";
import IconButton from "../atoms/iconButton/IconButton";
import { Cross } from "../Icons/Cross";
import { DownloadIcon } from "../Icons/DownloadIcon";
import { Palette } from "../Icons/Palette";
import { Switcher } from "../molecules/Switcher/Switcher";

interface EditProfileImgModalProps
{
  readonly onClose: () => void;
  readonly opened: boolean;
}

type SelectedFile = {
  readonly clientSideUuid: string;
  readonly file: File;
};

const tabs = [
  { icon: <DownloadIcon/>, title: "Upload image" },
  { icon: <Palette/>, title: "Constellatio library" }
] as const;

const EditProfileImgModal: FunctionComponent<EditProfileImgModalProps> = ({ onClose, opened }) => 
{
  const { invalidateUserDetails } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const inputRef = React.useRef<HTMLInputElement>(null);
  // const [selectedTab, setSelectedTab] = React.useState<string>(tabs?.[0]?.title ?? "");
  const [selectedFile, setSelectedFile] = useState<SelectedFile>();
  const selectedTab = tabs?.[0]?.title ?? "";
  const selectedFileUrl = selectedFile?.file && URL.createObjectURL(selectedFile?.file);
  const { mutateAsync: createSignedUploadUrl } = api.uploads.createSignedUploadUrl.useMutation();
  const { mutateAsync: setProfilePicture } = api.users.setProfilePicture.useMutation();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const uploadFileNotificationId = `upload-file-${selectedFile?.clientSideUuid}`;
  const { isLoading, mutate: uploadFile } = useMutation({
    mutationFn: async (): Promise<void> =>
    {
      if(!selectedFile)
      {
        console.log("no file selected");
        return;
      }

      const { clientSideUuid, file } = selectedFile;
      const originalFileName = file.name;

      const { serverFilename, uploadUrl } = await createSignedUploadUrl({
        contentType: file.type,
        fileSizeInBytes: file.size,
        filename: originalFileName,
      });

      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
      });

      await setProfilePicture({
        id: clientSideUuid,
        serverFilename,
      });

      await invalidateUserDetails();
    },
    mutationKey: ["uploadFile", selectedFile?.clientSideUuid],
    onError: (error) =>
    {
      console.error("Error while uploading file:", error);
      notifications.update({
        autoClose: false,
        color: "red",
        id: uploadFileNotificationId,
        loading: false,
        message: "Es ist ein Fehler beim Hochladen und Speichern der Datei aufgetreten.",
        title: "Fehler",
      });
    },
    onMutate: () =>
    {
      notifications.show({
        autoClose: false,
        color: "blue",
        id: uploadFileNotificationId,
        loading: true,
        message: "Bitte warte, während dein neues Profilbild hochgeladen wird.",
        title: "Profilbild wird hochgeladen",
      });
    },
    onSuccess: () =>
    {
      setSelectedFile(undefined);
      notifications.update({
        autoClose: false,
        color: "green",
        id: uploadFileNotificationId,
        loading: false,
        message: "Dein neues Profilbild wurde erfolgreich hochgeladen und gespeichert.",
        title: "Profilbild hochgeladen",
      });
    },
  });

  useEffect(() =>
  {
    if(!opened && selectedFile)
    {
      setSelectedFile(undefined);
    }
  }, [opened, selectedFile]);

  /* const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> =>
  {
    e.preventDefault();
    if(fileInputRef.current)
    {
      fileInputRef.current.value = "";
    }
    const uploads: Array<Promise<void>> = selectedFiles.map(async ({ clientSideUuid, file }) =>
    {
      try
      {
        await uploadFile(file, clientSideUuid);
        await invalidateUploadedFiles();
      }
      catch (e: unknown)
      {
        console.log("error while uploading file", e);
        setUploadState({
          clientSideUuid,
          fileNameWithExtension: file.name,
          state: { type: "failed" }
        });
        return Promise.reject(e);
      }
    });
    const uploadResults = await Promise.allSettled(uploads);
    const indicesOfSuccessfulUploads = getIndicesOfSucceededPromises(uploadResults);
    const newSelectedFiles = removeItemsByIndices<FileWithClientSideUuid>(selectedFiles, indicesOfSuccessfulUploads);
    setSelectedFiles(newSelectedFiles);
  };*/

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      lockScroll={false}
      title={<><Title order={3}>Change profile image</Title><button type="button" onClick={() => onClose()} css={styles.closeButton}><Cross/></button></>}
      styles={styles.modalStyles()}
      withCloseButton={false}
      centered>
      <div css={styles.profilePictureWrapper}>
        <ProfilePicture
          overwriteUrl={selectedFileUrl}
          sizeInPx={120}
        />
      </div>
      <Switcher
        className="switcher"
        size="big"
        defaultValue={selectedTab}
        tabStyleOverwrite={{ flex: "1" }}>
        {/* <Tabs.List>
          {tabs && tabs?.map((tab, tabIndex) => (
            <React.Fragment key={tabIndex}>
              <SwitcherTab
                icon={tab?.icon ?? <Trash/>}
                value={tab.title}
                onClick={() => { setSelectedTab(tab.title); }}>{tab.title}
              </SwitcherTab>
            </React.Fragment>
          ))}
        </Tabs.List>*/}
        {selectedTab === tabs[0]?.title && (
          <div css={styles.uploadImgCard} onClick={() => inputRef.current?.click()}>
            <IconButton
              icon={<DownloadIcon/>}
              size="big"
              type="button"
              onClick={(e) => 
              {
                e.stopPropagation();
                inputRef.current?.click(); 
              }}
            />
            <BodyText styleType="body-01-bold" component="p">Drag & drop image here or click to upload</BodyText>
            <input
              ref={fileInputRef}
              type="file"
              disabled={isLoading}
              multiple={false}
              accept="image/*"
              onChange={(e) =>
              {
                const file = e.target.files?.[0];

                if(!file)
                {
                  return;
                }

                setSelectedFile({ clientSideUuid: getRandomUuid(), file });
              }}
              css={styles.uploadImgInput}
            />
          </div>
        )}
        {/* {selectedTab === tabs[1]?.title && (
          <div css={styles.libraryArea}>{
            [...new Array(3)].map((_, i) => (
              <CaisyImg
                key={i}
                onClick={() => { console.log(`clicked img: ${i + 1} from library`); }}
                css={styles.profileImage}
                src={FlagImgPlaceholder.src}
                width={90}
                height={90}
              />
            ))
          }
          </div>
        )}*/}
        <Button<"button">
          css={styles.saveButton}
          styleType="primary"
          type="button"
          loaderPosition="right"
          disabled={isLoading || !selectedFile}
          onClick={() => uploadFile()}>
          Upload and Save
        </Button>
      </Switcher>
    </Modal>
  );
};

export default EditProfileImgModal;
