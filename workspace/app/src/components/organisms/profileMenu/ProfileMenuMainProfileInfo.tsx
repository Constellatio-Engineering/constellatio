import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Edit } from "@/components/Icons/Edit";
import ProfilePicture from "@/components/molecules/profilePicture/ProfilePicture";
import EditProfileImgModal from "@/components/organisms/editProfileImgModal/EditProfileImgModal";

import { type UserFiltered } from "@constellatio/api/utils/filters";
import { Title } from "@mantine/core";
import { type FunctionComponent, useState } from "react";

import * as styles from "./ProfileMenu.styles";

const profilePictureSizeInPx = 90;

type Props = {
  readonly userDetails: UserFiltered;
};

const ProfileMenuMainProfileInfo: FunctionComponent<Props> = ({ userDetails }) =>
{
  const { displayName, firstName, lastName } = userDetails;
  const name = [firstName, lastName].filter(Boolean).join(" ");
  const [showEditImgModal, setShowEditImgModal] = useState<boolean>(false);

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
          <Title style={{ fontSize: 25 }} order={2}>{name || displayName}</Title>
        </div>
        <BodyText styleType="body-01-medium" css={styles.profileNameHandler} component="p">
          {name ? (
            <span>@{displayName}</span>
          ) : (
            <span css={styles.noNameSet}>Kein Name gespeichert</span>
          )}
        </BodyText>
      </div>
      <EditProfileImgModal
        opened={showEditImgModal}
        onClose={() => setShowEditImgModal(false)}
      />
    </div> 
  );
};
export default ProfileMenuMainProfileInfo;
