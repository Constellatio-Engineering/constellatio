import { supabase } from "@/lib/supabase";

import { notifications } from "@mantine/notifications";
import type { AuthOtpResponse } from "@supabase/gotrue-js";
import { useMutation } from "@tanstack/react-query";

type Params = {
  email: string;
  onError?: (error: unknown) => void;
  onMutate?: () => void;
  onSuccess?: () => void;
  showNotifications: boolean;
};

export const useResendConfirmationEmail = ({
  email,
  onError,
  onMutate,
  onSuccess,
  showNotifications
}: Params) => // eslint-disable-line @typescript-eslint/explicit-function-return-type
{
  const resendConfirmationEmailNotificationId = `resend-confirmation-email-${email}`;

  return useMutation({
    mutationFn: async (): Promise<AuthOtpResponse["data"]> =>
    {
      // throw new Error("Not implemented");

      const result = await supabase.auth.resend({
        email,
        type: "signup",
      });

      if(result.error)
      {
        throw result.error;
      }

      console.log("Resend confirmation email result:", result);

      return result.data;
    },
    mutationKey: ["resendConfirmationEmail", email],
    onError: (error) =>
    {
      console.error("Error while re sending confirmation email:", error);

      if(onError)
      {
        onError(error);
      }

      if(showNotifications)
      {
        notifications.update({
          autoClose: false,
          color: "red",
          id: resendConfirmationEmailNotificationId,
          loading: false,
          message: "Leider ist beim erneuten Senden der E-Mail ein Fehler aufgetreten. Bitte versuche es später erneut oder kontaktiere unseren Support.",
          title: "Fehler",
        });
      }
    },
    onMutate: () =>
    {
      if(onMutate)
      {
        onMutate();
      }

      if(showNotifications)
      {
        notifications.show({
          autoClose: false,
          color: "blue",
          id: resendConfirmationEmailNotificationId,
          loading: true,
          message: "Bitte warte, während wir dir eine neue E-Mail zusenden.",
          title: "E-Mail wird erneut gesendet",
        });
      }
    },
    onSuccess: () =>
    {
      if(onSuccess)
      {
        onSuccess();
      }

      if(showNotifications)
      {
        notifications.update({
          autoClose: 3000,
          color: "green",
          id: resendConfirmationEmailNotificationId,
          loading: false,
          message: "Eine neue E-Mail wurde dir zugesendet. Bitte schaue in deinem E-Mail Postfach nach.",
          title: "E-Mail erneut gesendet",
        });
      }
    },
  });
};
