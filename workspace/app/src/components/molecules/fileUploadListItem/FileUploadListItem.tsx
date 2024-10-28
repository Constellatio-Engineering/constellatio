import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { AlertStoke } from "@/components/Icons/AlertStroke";
import { CheckCircleGreenIcon } from "@/components/Icons/CheckCircleGreen";
import { type UploadState } from "@/stores/uploadsProgress.store";

import { RingProgress } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./FileUploadListItem.styles";

interface FileUploadListItemProps
{
  readonly file: UploadState;
  readonly fileIcon: React.ReactNode;
  readonly progress: number;
  readonly title: string;
}

const FileUploadListItem: FunctionComponent<FileUploadListItemProps> = ({
  file,
  fileIcon,
  progress,
  title
}) => 
{

  // const [uploadInProgressHovered, setUploadInProgressHovered] = useState<boolean>(false);
 
  return (
    <div
      css={styles.wrapper}>
      <BodyText styleType="body-01-medium" component="p" title={title}>{fileIcon}{title}</BodyText>
      <div className="progress">
        {(file?.state?.type !== "failed") ? (progress < 100 ? (
          <div>
            {/* {!uploadInProgressHovered ? ( */}
            <RingProgress
              size={24}
              thickness={4}
              roundCaps
              sections={[
                { color: "red", value: progress ?? 0 },
              ]}
            />
          </div>
        ) : <CheckCircleGreenIcon/>) :
          ""}
        <div className="failed-text">
          {
            file?.state?.type === "failed" && (
              <BodyText styleType="body-01-medium">
                <AlertStoke/>Not uploaded
              </BodyText>
            )
          }
        </div>

      </div>
    </div>
  );
};

export default FileUploadListItem;
