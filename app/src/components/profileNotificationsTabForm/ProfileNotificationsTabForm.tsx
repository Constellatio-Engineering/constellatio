import { Checkbox } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileNotificationsTabForm.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import { Button } from "../atoms/Button/Button";
import { Checkbox as CheckboxComp } from "../atoms/Checkbox/Checkbox";

const ProfileNotificationsTabForm: FunctionComponent = () => 
{
  const [value, setValue] = React.useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => 
  {
    e.preventDefault();
    console.log({ value });
    alert("Values Successfuly logged to console!");

  };
  
  return (
    <div css={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <BodyText css={styles.formHeader} styleType="body-01-regular">Email me when:</BodyText>
        <Checkbox.Group value={value} onChange={setValue}>
          <CheckboxComp value="replies-to-questions" label={<BodyText styleType="body-01-medium" component="p">Someone replies to my question in Forum</BodyText>} css={styles.checkBox}/>
          <CheckboxComp value="replies-to-answers" label={<BodyText styleType="body-01-medium" component="p">Someone replies to my answer in Forum</BodyText>} css={styles.checkBox}/>
        </Checkbox.Group>
        <Button<"button"> type="submit" styleType="primary" css={styles.submitButton}>Save</Button>
      </form>
    </div>
  );
};

export default ProfileNotificationsTabForm;