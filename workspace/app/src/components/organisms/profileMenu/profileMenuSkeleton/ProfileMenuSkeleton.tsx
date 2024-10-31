import { Skeleton } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "./ProfileMenuSkeleton.styles";
import * as parentStyles from "../ProfileMenu.styles";

const ProfileMenuSkeleton: FunctionComponent = () => (
  <div css={[parentStyles.wrapper, styles.skeletonWrapper]}>
    <Skeleton
      height={70}
      circle
      style={{ margin: "0 auto 26px" }}
    />
    <Skeleton height={22}/>
    <Skeleton height={10} mt={10}/>
    <Skeleton height={50} mt={40}/>
    <Skeleton height={14} mt={24} width="70%"/>
    <Skeleton height={14} mt={24} width="70%"/>
    <Skeleton height={14} mt={24} width="70%"/>
    <Skeleton height={14} mt={24} width="70%"/>
    <Skeleton height={14} mt={24} width="70%"/>
    <Skeleton height={14} mt={24} width="70%"/>
    <Skeleton height={14} mt={24} width="70%"/>
    <Skeleton height={14} mt={24} width="70%"/>
    <Skeleton height={14} mt={24} width="70%"/>
  </div>
);

export default ProfileMenuSkeleton;
