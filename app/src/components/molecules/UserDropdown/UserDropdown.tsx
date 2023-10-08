import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { supabase } from "@/lib/supabase";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { paths } from "@/utils/paths";

import { Avatar, Menu } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconBrandStripe, IconLogout, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { type FunctionComponent } from "react";

export const UserDropdown: FunctionComponent = () =>
{
  const { invalidateEverything } = useContextAndErrorIfNull(InvalidateQueriesContext);
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
      await invalidateEverything();

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
          onClick={() => void router.push(`${paths.profile}`)}
          icon={<IconUser size="0.9rem" stroke={1.5}/>}>
          Overview
        </Menu.Item>
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
