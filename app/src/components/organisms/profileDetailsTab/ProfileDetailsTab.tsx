import DisplayNameInput from "@/components/organisms/RegistrationForm/form/DisplayNameInput";
import FirstNameInput from "@/components/organisms/RegistrationForm/form/FirstNameInput";
import LastNameInput from "@/components/organisms/RegistrationForm/form/LastNameInput";
import SemesterDropdown from "@/components/organisms/RegistrationForm/form/SemesterDropdown";
import UniversityDropdown from "@/components/organisms/RegistrationForm/form/UniversityDropdown";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { type UpdateUserDetailsSchema, updateUserDetailsSchema } from "@/schemas/auth/updateUserDetails.schema";
import { type University } from "@/schemas/auth/userData.validation";
import { api } from "@/utils/api";
import { type UserFiltered } from "@/utils/filters";

import { Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "next-i18next";
import React, { type FunctionComponent, useEffect } from "react";
import z from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

import * as styles from "./ProfileDetailsTab.styles";
import { Button } from "../../atoms/Button/Button";

type Props = {
  readonly userDetails: UserFiltered;
};

const ProfileDetailsTab: FunctionComponent<Props> = ({ userDetails }) =>
{
  const { invalidateUserDetails } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { t } = useTranslation();
  const isTabletScreen = useMediaQuery("(max-width: 1100px)");
  const form = useForm<UpdateUserDetailsSchema>({
    initialValues: {
      displayName: userDetails.displayName,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      semester: String(userDetails.semester),
      university: userDetails.university as University || null,
    },
    validate: zodResolver(updateUserDetailsSchema),
    validateInputOnBlur: true,
  });
  const hasUnsavedChanges = form.isDirty();

  useEffect(() =>
  {
    z.setErrorMap(makeZodI18nMap({ t }));
  }, [t]);

  const { isLoading: isUpdateUserDetailsLoading, mutate: updateUserDetails } = api.users.updateUserDetails.useMutation({
    onError: e =>
    {
      console.log("error while updating user data:", e);
      notifications.show({
        autoClose: false,
        color: "red",
        message: "Leider ist beim Speichern deiner Änderungen ein Fehler aufgetreten. Bitte versuche es erneut.",
        title: "Oops!",
      });
    },
    onSuccess: () =>
    {
      void invalidateUserDetails();
      form.resetDirty();
      notifications.show({
        autoClose: 5000,
        color: "green",
        message: "Deine Änderungen wurden erfolgreich gespeichert.",
        title: "Erfolgreich gespeichert",
      });
    },
  });

  const onSubmit = form.onSubmit(formValues => updateUserDetails(formValues));

  return (
    <div css={styles.wrapper}>
      {!isTabletScreen && <Title order={3}>Einstellungen</Title>}
      {/* {err && <AlertCard onClick={() => setErr(false)} variant="error">Es tut uns leid, deine Eingaben konnten nicht gespeichert werden. Bitte versuche es erneut.</AlertCard>}*/}
      {/* {success && (
        <AlertCard
          style={{ justifyContent: "flex-start" }}
          onClick={() => setSuccess(false)}
          stylesOverwrite={{ display: "flex", justifyContent: "flex-start", textAlign: "left" }}
          variant="success">Deine Änderungen wurden gespeichert.
        </AlertCard>
      )}*/}
      <form onSubmit={onSubmit}>
        <FirstNameInput {...form.getInputProps("firstName")}/>
        <LastNameInput {...form.getInputProps("lastName")}/>
        <DisplayNameInput {...form.getInputProps("displayName")}/>
        <UniversityDropdown {...form.getInputProps("university")}/>
        <SemesterDropdown {...form.getInputProps("semester")}/>
        <Button<"button">
          size="large"
          type="submit"
          loading={isUpdateUserDetailsLoading}
          styleType="primary"
          disabled={!hasUnsavedChanges || isUpdateUserDetailsLoading}>
          Änderungen speichern
        </Button>
      </form>
    </div>
  );
};

export default ProfileDetailsTab;
