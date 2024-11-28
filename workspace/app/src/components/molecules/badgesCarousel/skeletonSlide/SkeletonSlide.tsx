import { Skeleton } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "./SkeletonSlide.styles";

const SkeletonSlide: FunctionComponent = () => (
  <div css={styles.skeletonCard}>
    <Skeleton
      height={80}
      circle
      mb={30}
    />
    <Skeleton
      height={16}
      mt={6}
      width="60%"
      radius="xl"
    />
  </div>
);

export default SkeletonSlide;
