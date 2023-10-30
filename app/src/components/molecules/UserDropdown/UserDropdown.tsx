import { BodyText } from "@/components/atoms/BodyText/BodyText";
import ProfilePicture from "@/components/molecules/profilePicture/ProfilePicture";
import { useSignout } from "@/hooks/useSignout";
import useUserDetails from "@/hooks/useUserDetails";
import { paths } from "@/utils/paths";

import { Menu, Title } from "@mantine/core";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";

import * as styles from "./UserDropdown.styles";

export const UserDropdown: FunctionComponent = () =>
{
  const { handleSignOut } = useSignout();
  const { userDetails } = useUserDetails();
  const router = useRouter();

  if(!userDetails)
  {
    return (
      <div css={styles.placeholder}/>
    );
  }

  const { displayName, firstName, lastName } = userDetails;

  return (
    <Menu
      width={200}
      position="bottom-end"
      radius={12}
      transitionProps={{ transition: "pop-top-right" }}
      styles={styles.menuStyles()}>
      <Menu.Target>
        <div css={styles.target}>
          <ProfilePicture sizeInPx={30}/>
        </div>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          css={styles.menuItem}
          onClick={() => void router.push(`${paths.profile}`)}
          icon={null}>
          <div className="user-info">
            <ProfilePicture sizeInPx={60}/>
            <div>
              <Title order={4}>{`${firstName} ${lastName}`}</Title>
              <BodyText styleType="body-02-medium" component="p">@{displayName}</BodyText>
            </div>
          </div>
        </Menu.Item>
        <Menu.Item
          onClick={() => void router.push(`${paths.profile}`)}
          icon={<IconUser size="0.9rem" stroke={1.5}/>}>
          Profil
        </Menu.Item>
        <Menu.Item
          onClick={handleSignOut}
          icon={<IconLogout size="0.9rem" stroke={1.5}/>}>
          Ausloggen
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
