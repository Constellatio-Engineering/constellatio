import { BellIcon } from "@/components/Icons/Bell";
import { useAmountOfUnreadNotification } from "@/hooks/useAmountOfUnreadNotification";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { supabase } from "@/lib/supabase";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";

import { appPaths } from "@constellatio/shared/paths";
import Link from "next/link";
import { type FunctionComponent, useEffect } from "react"; 

import * as styles from "./NotificationsBell.styles";

const NotificationsBell: FunctionComponent = () =>
{
  const { data: amountOfUnreadNotifications } = useAmountOfUnreadNotification();
  const { invalidateAmountOfUnreadNotifications, invalidateNotifications } = useContextAndErrorIfNull(InvalidateQueriesContext);

  /* const queryClient = useQueryClient();

  const { data } = useQuery({
    queryFn: async () =>
    {
      const { data, error } = await supabase.from("Notification").select();

      if(error)
      {
        throw error;
      }

      return data;
    },
    queryKey: ["notifications"],
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: Infinity,
  });*/

  useEffect(() =>
  {
    const channel = supabase
      .channel("realtime notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Notification",
        },
        (_payload) =>
        {
          /* queryClient.setQueryData(["notifications"], (oldData: unknown[]) =>
          {
            if(!oldData) { return [payload.new]; }
            return [...oldData, payload.new];
          });*/

          void invalidateAmountOfUnreadNotifications();
          void invalidateNotifications();
        }
      )
      .subscribe();

    return () => void supabase.removeChannel(channel);
  }, [invalidateAmountOfUnreadNotifications, invalidateNotifications]);

  const count = Math.min(amountOfUnreadNotifications?.count ?? 0, 99);

  return (
    <Link href={appPaths.notifications}>
      <div css={styles.wrapper}>
        {count > 0 && (
          <div css={styles.count}>{count}</div>
        )}
        <BellIcon size={26}/>
      </div>
    </Link>
  );
};

export default NotificationsBell;
