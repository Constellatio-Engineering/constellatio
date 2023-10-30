import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { supabase } from "@/lib/supabase";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { paths } from "@/utils/paths";

import { notifications } from "@mantine/notifications";
import router from "next/router";

type UseSignout = () => {
  handleSignOut: () => Promise<void>;
};

export const useSignout: UseSignout = () =>
{
  const { invalidateEverything } = useContextAndErrorIfNull(InvalidateQueriesContext);

  const handleSignOut = async (): Promise<void> =>
  {
    try
    {
      await supabase.auth.signOut();
      await router.replace(paths.login);
      await invalidateEverything();

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
