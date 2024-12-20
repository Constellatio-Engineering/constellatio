/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import IconButton from "@/components/atoms/iconButton/IconButton";
import { DownloadIcon } from "@/components/Icons/DownloadIcon";
import { Palette } from "@/components/Icons/Palette";
import { Modal } from "@/components/molecules/Modal/Modal";
import ProfilePicture from "@/components/molecules/profilePicture/ProfilePicture";
import { Switcher } from "@/components/molecules/Switcher/Switcher";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { api } from "@/utils/api";

import { type CreateSignedUploadUrlSchema, generateCreateSignedUploadUrlSchema, type UploadableFile } from "@constellatio/schemas/routers/uploads/createSignedUploadUrl.schema";
import { type ImageFileExtension, imageFileExtensions, type ImageFileMimeType, imageFileMimeTypes } from "@constellatio/shared/validation";
import { getRandomUuid } from "@constellatio/utils/id";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { type FunctionComponent, useEffect, useRef, useState } from "react";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<SelectedFile>();
  const selectedTab = tabs?.[0]?.title ?? "";
  const selectedFileUrl = selectedFile?.file && URL.createObjectURL(selectedFile?.file);
  const { mutateAsync: createSignedUploadUrl } = api.users.createSignedProfilePictureUploadUrl.useMutation();
  const { mutateAsync: setProfilePicture } = api.users.setProfilePicture.useMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadFileNotificationId = `upload-file-${selectedFile?.clientSideUuid}`;

  const { isPending: isLoading, mutate: uploadFile } = useMutation({
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
      title="Neues Profilbild hochladen"
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
            <BodyText styleType="body-01-bold" component="p" align={"center"}>
              Lege ein Bild mit Drag & Drop ab oder klicke hier, um ein Bild auszuwählen
            </BodyText>
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
        <Button<"button">
          css={styles.saveButton}
          styleType="primary"
          type="button"
          loaderPosition="right"
          disabled={isLoading || !selectedFile}
          onClick={() => uploadFile()}>
          Hochladen und speichern
        </Button>
      </Switcher>
    </Modal>
  );
};

export default EditProfileImgModal;
