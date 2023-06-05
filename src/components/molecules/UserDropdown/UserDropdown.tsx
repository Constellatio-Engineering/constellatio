import { Avatar, Menu } from "@mantine/core";
import { IconBrandStripe, IconLogout } from "@tabler/icons-react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";

export function UserDropdown() {
  const supabase = createPagesBrowserClient();
  const router = useRouter();

  const handleSubscription = async () => {
    await router.push("/settings/billing");
  };
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      await router.replace("/login");
      notifications.show({
        title: "Sign out handler",
        message: "Come back soon!",
      });
    } catch (error) {}
  };

  return (
    <Menu
      width={200}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
    >
      <Menu.Target>
        <Avatar radius="xl" />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={handleSubscription}
          icon={<IconBrandStripe size="0.9rem" stroke={1.5} />}
        >
          Abonnement
        </Menu.Item>
        <Menu.Item
          onClick={handleSignOut}
          icon={<IconLogout size="0.9rem" stroke={1.5} />}
        >
          Abmelden
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
