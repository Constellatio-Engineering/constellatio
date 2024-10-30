import { type Nullable } from "@constellatio/utility-types";
import Image from "next/image";
import React, { type FunctionComponent } from "react";

import * as styles from "./UserProfilePicture.styles";
import genericProfileIcon from "../../../../public/images/icons/generic-user-icon.svg";

type Props = {
  readonly authorProfilePictureUrl: Nullable<string>;
};

const UserProfilePicture: FunctionComponent<Props> = ({ authorProfilePictureUrl }) =>
{
  return (
    <Image
      css={styles.profilePicture(authorProfilePictureUrl != null)}
      src={authorProfilePictureUrl ?? genericProfileIcon.src}
      alt="Avatar"
      width={28}
      height={28}
    />
  ); 
};

export default UserProfilePicture;
