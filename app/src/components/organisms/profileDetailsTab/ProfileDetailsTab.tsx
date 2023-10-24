import { AlertCard } from "@/components/atoms/Card/AlertCard";
import { Dropdown } from "@/components/atoms/Dropdown/Dropdown";
import { Input } from "@/components/atoms/Input/Input";
import { maximumAmountOfSemesters } from "@/schemas/auth/registrationForm.schema";

import { Title, Box } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import React, { type FunctionComponent } from "react";
import { z } from "zod";

import * as styles from "./ProfileDetailsTab.styles";
import { Button } from "../../atoms/Button/Button";
// import { decimalToRoman } from "../floatingPanel/generateTocHelper";
import { allUniversities } from "../RegistrationForm/RegistrationForm.data";

interface InitialValues 
{
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profileName: string;
  semester: string | number | undefined;
  university: string;
}

const ProfileDetailsTab: FunctionComponent = () => 
{
  const [err, setErr] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);

  const form = useForm<InitialValues>({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      profileName: "",
      semester: undefined,
      university: "",
    },
    validate: zodResolver(z.object({
      email: z.string().email({ message: "Ungültige E-Mail Adresse" }),
      firstName: z.string().min(2, { message: "Ein Vorname ist erforderlich" }),
      lastName: z.string().min(2, { message: "Ein Anzeigename ist erforderlich" }),
      password: z.string(),
      profileName: z.string().min(2, { message: "Ein Anzeigename ist erforderlich" }),
      semester: z.string().pipe(z.coerce.number().int().min(1).max(maximumAmountOfSemesters)).optional(),
      university: z.string().min(1, { message: "Eine Uni ist erforderlich" }),
    })),
    validateInputOnBlur: true,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => 
  {
    e.preventDefault();
    if(Object.keys(form.errors).length > 0) 
    {
      setErr(true);
      setSuccess(false);
    }
    else 
    {
      setErr(false);
      setSuccess(true);
    }
  };
  return (
    <div css={styles.wrapper}>
      <Title order={3}>Profile details</Title>
      {err && <AlertCard onClick={() => setErr(false)} variant="error">Sorry, we weren not able to save changes. Please, try again</AlertCard>}
      {success && (
        <AlertCard
          style={{ justifyContent: "flex-start" }}
          onClick={() => setSuccess(false)}
          stylesOverwrite={{ display: "flex", justifyContent: "flex-start", textAlign: "left" }}
          variant="success">Your changes have been saved
        </AlertCard>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          inputType="text"
          label="First name" 
          {...form.getInputProps("firstName")}
        />
        <Input
          inputType="text"
          label="Last name"
          {...form.getInputProps("lastName")}
        />
        <Input
          inputType="text"
          label="Porfile name"
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
        <Input 
          {...form.getInputProps("email")}
          inputType="text"
          label="Email"
        />        
        {form.isValid("email") && (
          <Input
            inputType="password" 
            label="Password (if changing email)"
            error="Sorry, your password doesn't match our records"
            {...form.getInputProps("password")}
          />
        )}
        <Button<"button"> size="large" type="submit" styleType="primary">Save changes</Button>
      </form>
    </div>
  );
};

export default ProfileDetailsTab;
