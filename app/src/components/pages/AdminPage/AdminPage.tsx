import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import { deleteUserSchema, type DeleteUserSchema } from "@/schemas/admin/deleteUser.schema";
import { api } from "@/utils/api";

import { Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { type FunctionComponent } from "react";

import * as styles from "./AdminPage.styles";

export const AdminPage: FunctionComponent = () =>
{
  const form = useForm<DeleteUserSchema>({
    initialValues: { userIdOrEmail: "" },
    validate: zodResolver(deleteUserSchema),
    validateInputOnBlur: true,
  });

  const { isPending, mutate: deleteUser } = api.admin.deleteUser.useMutation({
    onError: (error) =>
    {
      if(error.data?.clientError.identifier === "not-found")
      {
        notifications.show({
          autoClose: false,
          color: "red",
          message: "Leider konnte kein Benutzer mit dieser ID oder E-Mail-Adresse gefunden werden. Bitte versuche es erneut.",
          title: "Benutzer nicht gefunden",
        });
      }
      else if(error.data?.clientError.identifier === "self-deletion-request-forbidden")
      {
        notifications.show({
          autoClose: false,
          color: "red",
          message: "Du kannst deinen eigenen Account nicht löschen. Bitte versuche es mit einem anderen Benutzer.",
          title: "Account löschen nicht möglich",
        });
      }
      else
      {
        notifications.show({
          autoClose: false,
          color: "red",
          message: "Leider ist beim Löschen des Benutzers ein Fehler aufgetreten. Bitte versuche es erneut.",
          title: "Oops!",
        });
      }
    },
    onSuccess: () =>
    {
      form.reset();
      notifications.show({
        autoClose: 5000,
        color: "green",
        message: "Der Benutzer wurde erfolgreich gelöscht.",
        title: "Erfolgreich gelöscht",
      });
    },
  });

  const handleSubmit = (values: DeleteUserSchema) => 
  {
    modals.openConfirmModal({
      centered: true,
      children: (
        <BodyText styleType={"body-01-regular"} mb={24}>
          Bist du sicher, dass du den User <span style={{ fontStyle: "italic" }}>{form.values.userIdOrEmail}</span> löschen möchtest?
          Diese Aktion kann nicht rückgängig gemacht werden.
        </BodyText>
      ),
      confirmProps: {
        color: "red",
        style: { fontWeight: 700 },
      },
      labels: { cancel: "Abbrechen", confirm: "Ja, User endgültig löschen" },
      onConfirm: () => deleteUser(values),
      size: "lg",
      title: <BodyText styleType={"body-01-bold"} sx={{ fontSize: 28, fontWeight: 700 }}>User löschen</BodyText>,
    });
  };

  return (
    <div css={styles.wrapper}>
      <ContentWrapper stylesOverrides={styles.contentWrapper}>
        <Title order={1} sx={{ fontSize: 36 }}>Admin</Title>
        <form onSubmit={form.onSubmit(handleSubmit)} css={styles.form}>
          <Title order={2} sx={{ fontSize: 26 }}>User löschen</Title>
          <p>
            <mark>Achtung</mark>: Diese Funktion sollte nicht genutzt werden, um Accounts tatsächlicher Benutzer zu löschen.
            Diese Funktion sollte nur verwendet werden, um Accounts von Testbenutzern zu löschen.
            Neben den Einträgen in der Datenbank wird auch der Nutzer im Clickup CRM gelöscht.
          </p>
          <Input
            {...form.getInputProps("userIdOrEmail" satisfies keyof DeleteUserSchema)}
            inputType="text"
            placeholder={"user@constellatio.de"}
            label="E-Mail oder User ID"
            description="Die E-Mail Adresse oder ID des Users, der gelöscht werden soll."
          />
          <Button<"button">
            styleType={"primary"}
            type="submit"
            loading={isPending}
            disabled={isPending}
            size="large">
            User löschen
          </Button>
        </form>
      </ContentWrapper>
    </div>
  );
};
