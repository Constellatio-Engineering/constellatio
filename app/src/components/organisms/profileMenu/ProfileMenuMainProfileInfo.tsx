import CaisyImg from "@/basic-components/CaisyImg";
import { BodyText } from "@/components/atoms/BodyText/BodyText";

import { Title } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "./ProfileMenu.styles";

const ProfileMenuMainProfileInfo: FunctionComponent = () => 
{

  return (
    <div css={styles.profileInfo}>
      <div css={styles.profileImageWrapper}>
        <CaisyImg
          css={styles.profileImage}
          src="https://via.placeholder.com/90"
          width={90}
          height={90}
        />
      </div>
      <div css={styles.profileName}>
        <div css={styles.profileNameText}>
          <Title order={2}>Cameron Williamson</Title>
        </div>
        <p css={styles.profileNameHandler}>
          <BodyText styleType="body-01-medium" component="p">@cameron123</BodyText>
        </p>
      </div>
    </div> 
  );
};
export default ProfileMenuMainProfileInfo;
