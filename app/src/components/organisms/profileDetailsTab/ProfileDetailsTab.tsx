import { AlertCard } from "@/components/atoms/Card/AlertCard";
import { Dropdown } from "@/components/atoms/Dropdown/Dropdown";
import { Input } from "@/components/atoms/Input/Input";
import { maximumAmountOfSemesters } from "@/schemas/auth/registrationForm.schema";

import { Title, Box } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileDetailsTab.styles";
import { Button } from "../../atoms/Button/Button";
import { decimalToRoman } from "../floatingPanel/generateTocHelper";
import { allUniversities } from "../RegistrationForm/RegistrationForm.data";

const ProfileDetailsTab: FunctionComponent = () => 
{
  const [err, setErr] = React.useState<boolean>(true);
  const [success, setSuccess] = React.useState<boolean>(true);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => 
  {
    e.preventDefault();
    console.log("submit");
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
        <Input inputType="text" label="First name"/>
        <Input inputType="text" label="Last name"/>
        <Input inputType="text" label="Porfile name" error="This profile name already exists. Please try another name"/>
        <Dropdown
          // {...form.getInputProps("university")}
          label="Universität"
          title="Universität"
          placeholder="Universität auswählen"
          data={allUniversities}
          searchable
        />
        <Box maw={240}>
          <Dropdown
            // {...form.getInputProps("semester")}
            label="Semester"
            title="Semester"
            placeholder="Semester auswählen"
            data={Array(maximumAmountOfSemesters).fill(null).map((_, i) => String(decimalToRoman(i + 1) + " Semester"))}
          />
        </Box>
        <Input inputType="text" label="Email" error="Please include an '@' in the email address"/>        
        {/* <Input inputType="password" label="Password (if changing email)" error="Sorry, your password doesn't match our records"/>      */}
        <Input
          inputType="password" 
          label="Password (if changing email)"
          error="Sorry, your password doesn't match our records"
          // onVisibilityChange={toggle}
          // {...form.getInputProps("password")}
        />   
        <Button<"button"> size="large" type="submit" styleType="primary">Save changes</Button>
      </form>
    </div>
  );
};

export default ProfileDetailsTab;
