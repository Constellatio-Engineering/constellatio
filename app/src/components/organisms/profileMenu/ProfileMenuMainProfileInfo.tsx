import CaisyImg from "@/basic-components/CaisyImg";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import EditProfileImgModal from "@/components/editProfileImgModal/EditProfileImgModal";
import { Edit } from "@/components/Icons/Edit";

import { Title } from "@mantine/core";
import { type FunctionComponent } from "react";
import React from "react";

import * as styles from "./ProfileMenu.styles";

const ProfileMenuMainProfileInfo: FunctionComponent = () => 
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
          <Title order={2}>Cameron Williamson</Title>
        </div>
        <BodyText styleType="body-01-medium" css={styles.profileNameHandler} component="p">@cameron123</BodyText>
      </div>
      <EditProfileImgModal opened={showEditImgModal} onClose={() => setShowEditImgModal(false)}/>
    </div> 
  );
};
export default ProfileMenuMainProfileInfo;
