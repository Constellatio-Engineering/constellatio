/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import IconButton from "@/components/atoms/iconButton/IconButton";
import { DownloadIcon } from "@/components/Icons/DownloadIcon";
import { Palette } from "@/components/Icons/Palette";
import { Modal } from "@/components/molecules/Modal/Modal";
import ProfilePicture from "@/components/molecules/profilePicture/ProfilePicture";
import { Switcher } from "@/components/molecules/Switcher/Switcher";
import {
  type ImageFileExtension, imageFileExtensions, type ImageFileMimeType, imageFileMimeTypes
} from "@/db/schema";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type CreateSignedUploadUrlSchema, generateCreateSignedUploadUrlSchema, type UploadableFile } from "@/schemas/uploads/createSignedUploadUrl.schema";
import { api } from "@/utils/api";
import { getRandomUuid } from "@/utils/utils";

import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { type FunctionComponent, useEffect, useState } from "react";

import * as styles from "./EditProfileImgModal.styles";
type SelectedFile = {
  clientSideUuid: string;
  file: File;
  fileProps: UploadableFile<ImageFileExtension, ImageFileMimeType>;
};

const tabs = [
  { icon: <DownloadIcon/>, title: "Upload image" },
  { icon: <Palette/>, title: "Constellatio library" }
] as const;

interface EditProfileImgModalProps
{
  readonly onClose: () => void;
  readonly opened: boolean;
}

const EditProfileImgModal: FunctionComponent<EditProfileImgModalProps> = ({ onClose, opened }) => 
{
  const { invalidateUserDetails } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const inputRef = React.useRef<HTMLInputElement>(null);
  // const [selectedTab, setSelectedTab] = React.useState<string>(tabs?.[0]?.title ?? "");
  const [selectedFile, setSelectedFile] = useState<SelectedFile>();
  const selectedTab = tabs?.[0]?.title ?? "";
  const selectedFileUrl = selectedFile?.file && URL.createObjectURL(selectedFile?.file);
  const { mutateAsync: createSignedUploadUrl } = api.users.createSignedProfilePictureUploadUrl.useMutation();
  const { mutateAsync: setProfilePicture } = api.users.setProfilePicture.useMutation();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const uploadFileNotificationId = `upload-file-${selectedFile?.clientSideUuid}`;
  /* const avatarTypes: Array<IProfilePictureAvatars["type"]> = [
    "avatar-01", "avatar-02", "avatar-03", "avatar-04", "avatar-05", "avatar-06", "avatar-07"
  ];
  const theme = useMantineTheme();*/
  const { isLoading, mutate: uploadFile } = useMutation({
    mutationFn: async (): Promise<void> =>
    {
      if(!selectedFile)
      {
        console.log("no file selected");
        return;
      }

      const { clientSideUuid, file, fileProps } = selectedFile;

      const { serverFilename, uploadUrl } = await createSignedUploadUrl({
        contentType: fileProps.contentType,
        fileSizeInBytes: fileProps.fileSizeInBytes,
        filename: fileProps.filename,
      });

      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": fileProps.contentType },
      });

      await setProfilePicture({
        contentType: fileProps.contentType,
        fileExtensionLowercase: fileProps.fileExtensionLowercase,
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

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void =>
  {
    const file = e.target.files?.[0];

    if(!file)
    {
      return;
    }

    const fileProps: CreateSignedUploadUrlSchema = {
      contentType: file.type,
      fileSizeInBytes: file.size,
      filename: file.name
    };

    const parsedFileProps = generateCreateSignedUploadUrlSchema(imageFileExtensions, imageFileMimeTypes).safeParse(fileProps);

    if(!parsedFileProps.success)
    {
      notifications.show({
        color: "red",
        message: "Die Datei konnten nicht hochgeladen werden, da sie zu groß ist oder ein ungültiges Format hat",
        title: "Ungültige Datei"
      });
      return;
    }

    setSelectedFile({
      clientSideUuid: getRandomUuid(),
      file,
      fileProps: parsedFileProps.data
    });
  };

  useEffect(() =>
  {
    if(!opened && selectedFile)
    {
      setSelectedFile(undefined);
    }
  }, [opened, selectedFile]);

  return (
    <Modal
      opened={opened}
      onClose={() => !isLoading && onClose()}
      lockScroll={false}
      title="Change profile image"
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
              accept={imageFileExtensions.map(ext => `.${ext}`).join(", ")}
              onChange={onFileSelected}
              css={styles.uploadImgInput}
            />
          </div>
        )}
        {/* {selectedTab === tabs[1]?.title && (
          <div css={styles.libraryArea}>{
            avatarTypes.map((_, i) => 
            {
              const avatarType = avatarTypes[i];
              if(!avatarType) { return null; }
              return (
                <span css={styles.avatarIcon({ selected: i === 0, theme })} key={i}><ProfileAvatar type={avatarType}/></span>
              );
            })
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
