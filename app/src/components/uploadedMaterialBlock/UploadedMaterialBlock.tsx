import React, { type FunctionComponent } from "react";

import * as styles from "./UploadedMaterialBlock.styles";
import { Title } from "@mantine/core";

interface UploadedMaterialBlockProps {
  uploadedMaterial?: any[];
}

const UploadedMaterialBlock: FunctionComponent<UploadedMaterialBlockProps> = (props) => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.uploadedMaterialBlockHead}>
        <Title order={4}>Uploaded materials <span>({props?.uploadedMaterial?.length ?? 0})</span></Title>
      </div>

    </div>
  );
};

export default UploadedMaterialBlock;
