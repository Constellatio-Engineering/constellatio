import { Input, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileDetailsTab.styles";
import { BodyText } from "../../atoms/BodyText/BodyText";
import { Button } from "../../atoms/Button/Button";

const ProfileDetailsTab: FunctionComponent = () => 
{

  const form = useForm({
    initialValues: {
      email: "johndoe@mail.com",
      fName: "Cameron",
      lName: "Williamson",
      profileName: "cameron123",
      semester: "III Semester",
      university: "UCLA"
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => 
  {
    e.preventDefault();
    console.log(form.values);
    alert("Changes Loged to the console");
  };

  return (
    <div css={styles.wrapper}>
      <Title order={3}>Profile details</Title>
      <form onSubmit={handleSubmit}>
        <Input.Wrapper label={<BodyText styleType="body-01-regular">First name</BodyText>} description="" error="">
          <TextInput placeholder="" type="text" {...form.getInputProps("fName")}/>
        </Input.Wrapper>
        <Input.Wrapper label={<BodyText styleType="body-01-regular">Last name</BodyText>} description="" error="">
          <TextInput placeholder="" type="text" {...form.getInputProps("lName")}/>
        </Input.Wrapper>
        <Input.Wrapper label={<BodyText styleType="body-01-regular">Porfile name</BodyText>} description="" error="">
          <TextInput placeholder="" type="text" {...form.getInputProps("profileName")}/>
        </Input.Wrapper>
        <Input.Wrapper label={<BodyText styleType="body-01-regular">Your university</BodyText>} description="" error="">
          <TextInput placeholder="" type="text" {...form.getInputProps("university")}/>
        </Input.Wrapper>
        <Input.Wrapper label={<BodyText styleType="body-01-regular">Semester</BodyText>} description="" error="">
          <TextInput placeholder="" type="text" {...form.getInputProps("semester")}/>
        </Input.Wrapper>
        <Input.Wrapper label={<BodyText styleType="body-01-regular">Email</BodyText>} description="" error="">
          <TextInput placeholder="" type="text" {...form.getInputProps("email")}/>
        </Input.Wrapper>
        <Button<"button"> type="submit" styleType="primary">Save changes</Button>
      </form>
    </div>
  );
};

export default ProfileDetailsTab;