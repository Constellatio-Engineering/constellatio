import { AlertCard } from "@/components/atoms/Card/AlertCard";
import { Dropdown } from "@/components/atoms/Dropdown/Dropdown";
import { Input } from "@/components/atoms/Input/Input";
import { type UpdateUserDetailsSchema, updateUserDetailsSchema } from "@/schemas/auth/updateUserDetails.schema";
import { allUniversities, maximumAmountOfSemesters, type University } from "@/schemas/auth/userData.validation";
import { type UserFiltered } from "@/utils/filters";

import { Title, Box } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
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
  const { t } = useTranslation();
  const isTabletScreen = useMediaQuery("(max-width: 1100px)");
  const form = useForm<UpdateUserDetailsSchema>({
    initialValues: {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      profileName: userDetails.displayName,
      semester: String(userDetails.semester),
      university: userDetails.university as University || null,
    },
    validate: zodResolver(updateUserDetailsSchema),
    validateInputOnBlur: true,
  });

  useEffect(() =>
  {
    z.setErrorMap(makeZodI18nMap({ t }));
  }, [t]);

  const onSubmit = (): void => console.log(form.values);

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
        <Input
          inputType="text"
          label="Vorname" 
          {...form.getInputProps("firstName")}
        />
        <Input
          inputType="text"
          label="Nachname"
          {...form.getInputProps("lastName")}
        />
        <Input
          inputType="text"
          label="Anzeigename"
          {...form.getInputProps("profileName")}
        />
        <Dropdown
          {...form.getInputProps("university")}
          label="Universität"
          title="Universität"
          placeholder="Universität auswählen"
          data={allUniversities}
          searchable
        />
        <Box maw={240}>
          <Dropdown
            {...form.getInputProps("semester")}
            label="Semester"
            title="Semester"
            placeholder="Semester auswählen"
            // THIS RENDERS THE FIGMA DESIGN OPTIONS BUT DOESN'T WORK WITH THE VALIDATOR
            // data={Array(maximumAmountOfSemesters).fill(null).map((_, i) => String(decimalToRoman(i + 1) + " Semester"))}
            data={Array(maximumAmountOfSemesters).fill(null).map((_, i) => String(i + 1))}
          />
        </Box>
        <Button<"button"> size="large" type="submit" styleType="primary">Änderungen speichern</Button>
      </form>
    </div>
  );
};

export default ProfileDetailsTab;
