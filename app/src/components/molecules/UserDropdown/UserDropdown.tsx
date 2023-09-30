import { api } from "@/utils/api";

import { Avatar, Menu } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { IconBrandStripe, IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { type FunctionComponent } from "react";

export const UserDropdown: FunctionComponent = () =>
{
  const supabase = useSupabaseClient();
  const apiContext = api.useContext();
  const router = useRouter();

  const handleSubscription = async (): Promise<void> =>
  {
    await router.push("/settings/billing");
  };

  const handleSignOut = async (): Promise<void> =>
  {
    try
    {
      await supabase.auth.signOut();
      await router.replace("/login");
      await apiContext.invalidate();

      notifications.show({
        message: "Come back soon!",
        title: "Signed out",
      });
    }
    catch (error) 
    {
      console.log("error while signing out", error);
    }
  };

  return (
    <Menu
      width={200}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}>
      <Menu.Target>
        <Avatar radius="xl"/>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={handleSubscription}
          icon={<IconBrandStripe size="0.9rem" stroke={1.5}/>}>
          Abonnement
        </Menu.Item>
        <Menu.Item
          onClick={handleSignOut}
          icon={<IconLogout size="0.9rem" stroke={1.5}/>}>
          Abmelden
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
