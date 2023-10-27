/* eslint-disable max-lines */
import ProfilePicture from "@/components/molecules/profilePicture/ProfilePicture";
import {
  type ImageFileExtension, imageFileExtensions, type ImageFileMimeType, imageFileMimeTypes
} from "@/db/schema";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type CreateSignedUploadUrlSchema, generateCreateSignedUploadUrlSchema, type UploadableFile } from "@/schemas/uploads/createSignedUploadUrl.schema";
import { api } from "@/utils/api";
import { getRandomUuid } from "@/utils/utils";

import { Tabs, useMantineTheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { type FunctionComponent, useEffect, useState } from "react";

import * as styles from "./EditProfileImgModal.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import { Button } from "../atoms/Button/Button";
import IconButton from "../atoms/iconButton/IconButton";
import { SwitcherTab } from "../atoms/Switcher-tab/SwitcherTab";
import { DownloadIcon } from "../Icons/DownloadIcon";
import { Palette } from "../Icons/Palette";
import { ProfileAvatar, type IProfilePictureAvatars } from "../Icons/ProfileAvatar";
import { Trash } from "../Icons/Trash";
import { Modal } from "../molecules/Modal/Modal";
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
  const [selectedTab, setSelectedTab] = React.useState<string>(tabs?.[0]?.title ?? "");
  const [selectedFile, setSelectedFile] = useState<SelectedFile>();
  // const selectedTab = tabs?.[0]?.title ?? "";
  const selectedFileUrl = selectedFile?.file && URL.createObjectURL(selectedFile?.file);
  const { mutateAsync: createSignedUploadUrl } = api.users.createSignedProfilePictureUploadUrl.useMutation();
  const { mutateAsync: setProfilePicture } = api.users.setProfilePicture.useMutation();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const uploadFileNotificationId = `upload-file-${selectedFile?.clientSideUuid}`;
  const avatarTypes: Array<IProfilePictureAvatars["type"]> = [
    "avatar-01", "avatar-02", "avatar-03", "avatar-04", "avatar-05", "avatar-06", "avatar-07"
  ];
  const theme = useMantineTheme();
  const { isLoading, mutate: uploadFile } = useMutation({
    mutationFn: async (): Promise<void> =>
    {
      if(!selectedFile)
      {
        console.log("no file selected");
        return;
      }

      const { clientSideUuid, file } = selectedFile;

      const fileToUpload: CreateSignedUploadUrlSchema = {
        contentType: file.type,
        fileSizeInBytes: file.size,
        filename: file.name
      };

      let parsedFile: UploadableFile<ImageFileExtension, ImageFileMimeType>;

      try
      {
        parsedFile = await (generateCreateSignedUploadUrlSchema(imageFileExtensions, imageFileMimeTypes).parseAsync(fileToUpload));
      }
      catch (e: unknown)
      {
        notifications.show({
          color: "red",
          message: "Die Datei konnten nicht hochgeladen werden, da sie zu groß ist oder ein ungültiges Format hat",
          title: "Ungültige Datei"
        });
        return;
      }

      const { serverFilename, uploadUrl } = await createSignedUploadUrl({
        contentType: parsedFile.contentType,
        fileSizeInBytes: parsedFile.fileSizeInBytes,
        filename: parsedFile.filename,
      });

      await axios.put(uploadUrl, parsedFile, {
        headers: { "Content-Type": parsedFile.contentType },
      });

      await setProfilePicture({
        contentType: parsedFile.contentType,
        fileExtensionLowercase: parsedFile.fileExtensionLowercase,
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

  return (
    <Modal
      opened={opened}
      onClose={onClose}
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
        <Tabs.List>
          {tabs && tabs?.map((tab, tabIndex) => (
            <React.Fragment key={tabIndex}>
              <SwitcherTab
                icon={tab?.icon ?? <Trash/>}
                value={tab.title}
                onClick={() => { setSelectedTab(tab.title); }}>{tab.title}
              </SwitcherTab>
            </React.Fragment>
          ))}
        </Tabs.List>
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
        {selectedTab === tabs[1]?.title && (
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
        )}
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
