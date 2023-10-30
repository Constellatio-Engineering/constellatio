import { BodyText } from "@/components/atoms/BodyText/BodyText";
import EditProfileImgModal from "@/components/editProfileImgModal/EditProfileImgModal";
import { Edit } from "@/components/Icons/Edit";
import ProfilePicture from "@/components/molecules/profilePicture/ProfilePicture";
import { type UserFiltered } from "@/utils/filters";

import { Title } from "@mantine/core";
import { type FunctionComponent } from "react";
import React from "react";

import * as styles from "./ProfileMenu.styles";

const profilePictureSizeInPx = 90;

type Props = {
  readonly userDetails: UserFiltered;
};

const ProfileMenuMainProfileInfo: FunctionComponent<Props> = ({ userDetails }) =>
{
  const [showEditImgModal, setShowEditImgModal] = React.useState<boolean>(false);

  return (
    <div css={styles.profileInfo}>
      <div css={styles.profileImageWrapper(profilePictureSizeInPx)}>
        <ProfilePicture
          sizeInPx={profilePictureSizeInPx}
          onClick={() => setShowEditImgModal(true)}
        />
        <span/>
        <Edit/>
      </div>
      <div css={styles.profileName}>
        <div css={styles.profileNameText}>
          <Title style={{ fontSize: 25 }} order={2}>{userDetails.firstName + " " + userDetails.lastName}</Title>
        </div>
        <BodyText styleType="body-01-medium" css={styles.profileNameHandler} component="p">@{userDetails.displayName}</BodyText>
      </div>
      <EditProfileImgModal
        opened={showEditImgModal}
        onClose={() => setShowEditImgModal(false)}
      />
    </div> 
  );
};
export default ProfileMenuMainProfileInfo;
