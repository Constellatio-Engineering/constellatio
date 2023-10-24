import useSignedProfilePictureUrl from "@/hooks/useSignedProfilePictureUrl";

import Image from "next/image";
import React, { type ComponentProps, type FunctionComponent } from "react";

import * as styles from "./ProfilePicture.styles";

interface ProfilePictureProps extends ComponentProps<"div">
{
  readonly overwriteUrl?: string;
  readonly sizeInPx?: number;
}

const ProfilePicture: FunctionComponent<ProfilePictureProps> = ({
  overwriteUrl,
  sizeInPx = 50,
  ...props
}) =>
{
  const { url: profilePictureUrl } = useSignedProfilePictureUrl();

  return (
    <div {...props} css={styles.wrapper(sizeInPx)}>
      <Image
        css={styles.image}
        src={overwriteUrl || profilePictureUrl || `https://via.placeholder.com/${sizeInPx}`}
        alt="Profilbild"
        width={sizeInPx}
        height={sizeInPx}
      />
    </div>

  );
};

export default ProfilePicture;
