import CaisyImg from "@/basic-components/CaisyImg";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import EditProfileImgModal from "@/components/editProfileImgModal/EditProfileImgModal";
import { Edit } from "@/components/Icons/Edit";
import { type UserDetails } from "@/components/pages/profilePage/ProfilePage";

import { Title } from "@mantine/core";
import { type FunctionComponent } from "react";
import React from "react";

import * as styles from "./ProfileMenu.styles";

const ProfileMenuMainProfileInfo: FunctionComponent<UserDetails> = ({ userDetails }) =>
{
  const [showEditImgModal, setShowEditImgModal] = React.useState<boolean>(false);
  return (
    <div css={styles.profileInfo}>
      <div css={styles.profileImageWrapper}>
        <CaisyImg
          onClick={() => setShowEditImgModal(true)}
          css={styles.profileImage}
          src="https://via.placeholder.com/90"
          width={90}
          height={90}
        />
        <span/>
        <Edit/>
      </div>
      <div css={styles.profileName}>
        <div css={styles.profileNameText}>
          <Title order={2}>{userDetails.firstName + " " + userDetails.lastName}</Title>
        </div>
        <BodyText styleType="body-01-medium" css={styles.profileNameHandler} component="p">@{userDetails.displayName}</BodyText>
      </div>
      <EditProfileImgModal opened={showEditImgModal} onClose={() => setShowEditImgModal(false)}/>
    </div> 
  );
};
export default ProfileMenuMainProfileInfo;
