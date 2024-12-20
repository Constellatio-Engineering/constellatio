import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Heart } from "@/components/Icons/Heart";
import ProfilePicture from "@/components/molecules/profilePicture/ProfilePicture";
import HeaderDefaultRecreateSearch from "@/components/organisms/Header/DefaultHeader/HeaderDefaultRecreateSearch";
import { useSignout } from "@/hooks/useSignout";
import useUserDetails from "@/hooks/useUserDetails";

import { isDevelopment } from "@constellatio/env";
import { appPaths } from "@constellatio/shared/paths";
import { Menu, Title } from "@mantine/core";
import { IconLogout, IconUser, IconAlertTriangleFilled } from "@tabler/icons-react";
import Link from "next/link";
import { type FunctionComponent } from "react";

import * as styles from "./UserDropdown.styles";

export const UserDropdown: FunctionComponent = () =>
{
  const { handleSignOut } = useSignout();
  const { userDetails } = useUserDetails();

  if(!userDetails)
  {
    return (
      <div css={styles.placeholder}/>
    );
  }

  const {
    displayName,
    firstName,
    lastName,
    roles
  } = userDetails;

  const rolesJoined = roles.length > 0 && roles.map(r => r.name).join(", ");
  const name = [firstName, lastName].filter(Boolean).join(" ");
  const isAdmin = roles.some(r => r.identifier === "admin");

  return (
    <Menu
      width={320}
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
          component={Link}
          href={appPaths.profile}
          css={styles.menuItem}
          icon={null}>
          <div className="user-info">
            <ProfilePicture sizeInPx={60} disableMarginAuto={true}/>
            <div>
              <Title order={4}>{name || displayName}</Title>
              <BodyText styleType="body-02-medium" component="p">
                {name ? (
                  <span>@{displayName}</span>
                ) : (
                  <span css={styles.noNameSet}>Kein Name gespeichert</span>
                )}
              </BodyText>
              {rolesJoined && (
                <BodyText styleType="body-02-medium" component="p">{rolesJoined}</BodyText>
              )}
            </div>
          </div>
        </Menu.Item>
        {isDevelopment && (
          <HeaderDefaultRecreateSearch/>
        )}
        {isAdmin && (
          <Menu.Item
            sx={{ fontSize: 15 }}
            component={Link}
            href={appPaths.admin}
            icon={<IconAlertTriangleFilled size="1rem" stroke={1.5}/>}>
            Admin Panel
          </Menu.Item>
        )}
        <Menu.Item
          sx={{ fontSize: 15 }}
          component={Link}
          href={appPaths.profile}
          icon={<IconUser size="1rem" stroke={1.5}/>}>
          Profil
        </Menu.Item>
        <Menu.Item
          sx={{ fontSize: 15 }}
          component={Link}
          href={appPaths.profile + "?tab=referral"}
          icon={<Heart size={16}/>}>
          Freunde werben
        </Menu.Item>
        <Menu.Item
          sx={{ fontSize: 15 }}
          onClick={handleSignOut}
          icon={<IconLogout size="1rem" stroke={1.5}/>}>
          Ausloggen
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
