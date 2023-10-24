import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { AlertCard } from "@/components/atoms/Card/AlertCard";
import { Input } from "@/components/atoms/Input/Input";
import { ArrowDown } from "@/components/Icons/ArrowDown";

import { Title, NativeSelect, useMantineTheme } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileDetailsTab.styles";
import { Button } from "../../atoms/Button/Button";

const ProfileDetailsTab: FunctionComponent = () => 
{
  const [err, setErr] = React.useState<boolean>(true);
  const [success, setSuccess] = React.useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => 
  {
    e.preventDefault();
    console.log("submit");
  };
  const theme = useMantineTheme();
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
        <NativeSelect
          style={{ color: theme.colors["neutrals-01"][9] }}
          label={<BodyText styleType="body-01-regular" style={{ color: theme.colors["neutrals-01"][9] }} component="p">Your university</BodyText>}
          placeholder=""
          data={["UCLA"]}
          radius={8}
          description=""
          rightSection={<ArrowDown/>}
        />
        <NativeSelect
          radius={8}
          style={{ color: theme.colors["neutrals-01"][9], width: "240px" }}
          label={(
            <>
              <BodyText styleType="body-01-regular" component="p">Semester</BodyText>
              <BodyText styleType="body-02-medium" component="span">Optional</BodyText>
            </>
          )}
          placeholder=""
          data={["I Semester", "II Semester", "III Semester", "IV Semester"]}
          description=""
          rightSection={<ArrowDown/>}
        />
        <Input inputType="text" label="Email" error="Please include an '@' in the email address"/>        
        <Input inputType="password" label="Password (if changing email)" error="Sorry, your password doesn't match our records"/>        
        <Button<"button"> size="large" type="submit" styleType="primary">Save changes</Button>
      </form>
    </div>
  );
};

export default ProfileDetailsTab;
