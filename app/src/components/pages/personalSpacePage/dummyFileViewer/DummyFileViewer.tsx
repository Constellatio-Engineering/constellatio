import useSignedGetUrl from "@/hooks/useSignedGetUrl";

import { Loader } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./DummyFileViewer.styles";

interface DummyFileViewerProps
{
  readonly fileId: string;
}

const DummyFileViewer: FunctionComponent<DummyFileViewerProps> = ({ fileId }) => 
{
  const { isLoading: isGetUrlLoading, url } = useSignedGetUrl(fileId);

  if(isGetUrlLoading)
  {
    return <Loader/>;
  }

  if(!url)
  {
    return (
      <div css={styles.wrapper}>
        <p>Could not get file URL</p>
      </div>
    );
  }

  return (
    <div css={styles.wrapper}>
      <h2 style={{ fontSize: 22 }}>File Viewer</h2>
      <p>ID of selected Image: {fileId}</p>
      <img src={url} alt="image"/>
    </div>
  );
};

export default DummyFileViewer;
