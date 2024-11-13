import { Skeleton } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "./RenderedTabSkeleton.styles";

const RenderedTabSkeleton: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <Skeleton height={40} mb={60}/>
    {Array.from({ length: 10 }).map((_, index) => (
      <Skeleton
        key={index}
        height={30}
        mb={20}
        width="70%"
      />
    ))}
  </div>
);

export default RenderedTabSkeleton;
