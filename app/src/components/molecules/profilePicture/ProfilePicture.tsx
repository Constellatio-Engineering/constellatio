import useSignedProfilePictureUrl from "@/hooks/useSignedProfilePictureUrl";

import Image from "next/image";
import React, { type ComponentProps, type FunctionComponent } from "react";

import * as styles from "./ProfilePicture.styles";
import { IProfilePictureAvatars, ProfilePictureAvatar } from "@/components/Icons/ProfilePictureAvatar";
import genericProfileIcon from "../../../../public/images/icons/generic-user-icon.svg";

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
  const userChosenAvatar: IProfilePictureAvatars['type'] | false = false 
  return (
    <div {...props} css={styles.wrapper(sizeInPx)}>
      {userChosenAvatar && ( <ProfilePictureAvatar type={userChosenAvatar ?? "avatar-01"}/>)}
    <Image
        css={styles.image}
        src={overwriteUrl || profilePictureUrl || genericProfileIcon.src }
        alt="Profilbild"
        width={sizeInPx}
        height={sizeInPx}
      />
    </div>

  );
};

export default ProfilePicture;
{/* */}