import { notifications } from "@mantine/notifications";
import router from "next/router";

import { supabase } from "@/lib/supabase";
import { authPaths } from "@/utils/paths";
import { sleep } from "@/utils/utils";

type UseSignout = () => {
  handleSignOut: () => Promise<void>;
};

export const useSignout: UseSignout = () =>
{
  const handleSignOut = async (): Promise<void> =>
  {
    try
    {
      await supabase.auth.signOut();
      await sleep(250);
      await router.replace(authPaths.login);

      notifications.show({
        message: "Bis bald bei Constellatio!",
        title: "Abgemeldet",
      });
    }
    catch (error)
    {
      console.error("error while signing out", error);
      notifications.show({
        autoClose: false,
        color: "red",
        message: "Du konntest nicht abgemeldet werden.",
        title: "Ups, da ist etwas schiefgelaufen!",
      });
    }
  };

  return { handleSignOut };
};
