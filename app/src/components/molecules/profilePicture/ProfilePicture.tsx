import { type IProfilePictureAvatars, ProfileAvatar } from "@/components/Icons/ProfileAvatar";
import useUserDetails from "@/hooks/useUserDetails";

import Image from "next/image";
import React, { type ComponentProps, type FunctionComponent } from "react";

import * as styles from "./ProfilePicture.styles";
import genericProfileIcon from "../../../../public/images/icons/generic-user-icon.svg";

interface ProfilePictureProps extends ComponentProps<"div">
{
  readonly disableMarginAuto?: boolean;
  readonly overwriteUrl?: string;
  readonly sizeInPx?: number;
}

const ProfilePicture: FunctionComponent<ProfilePictureProps> = ({
  disableMarginAuto = false,
  overwriteUrl,
  sizeInPx = 50,
  ...props
}) =>
{
  const { userDetails } = useUserDetails();
  const userChosenAvatar: IProfilePictureAvatars["type"] | false = false;

  return (
    <div {...props} css={styles.wrapper(sizeInPx, disableMarginAuto)}>
      {userChosenAvatar && (<ProfileAvatar type={userChosenAvatar ?? "avatar-01"}/>)}
      <Image
        css={styles.image}
        src={overwriteUrl || userDetails?.profilePicture?.url || genericProfileIcon.src}
        alt="Profilbild"
        width={sizeInPx}
        height={sizeInPx}
      />
    </div>
  );
};

export default ProfilePicture;
{ /* */ }
