// import { styles } from "@/components/atoms/PasswordStrengthMeter/PasswordStrengthMeter.styles";

import { type FunctionComponent } from "react";

const ProfileNotificationsTabForm: FunctionComponent = () => 
{
  return <p>Unused</p>;

  /* const [value, setValue] = useState<string[]>([]);
  const [err, setErr] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => 
  {
    e.preventDefault();
    console.log({ value });
    alert("Values Successfuly logged to console!");
    setErr("Sorry, we weren’t able to save changes. Please, try again"); 
    setSuccess("Your changes have been saved");
  };

  return (
    <div css={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <BodyText css={styles.formHeader} styleType="body-01-regular">Email me when:</BodyText>
        <AlertCard
          stylesOverwrite={{
            width: "100%" 
          }}
          variant="success">Your changes have been saved
        </AlertCard>
        <AlertCard variant="error">Sorry, we weren&apos;t able to save changes. Please, try again</AlertCard>
        <Checkbox.Group value={value} onChange={setValue}>
          <CheckboxComp value="replies-to-questions" label={<BodyText styleType="body-01-medium" component="p">Someone replies to my question in Forum</BodyText>} css={styles.checkBox}/>
          <CheckboxComp value="replies-to-answers" label={<BodyText styleType="body-01-medium" component="p">Someone replies to my answer in Forum</BodyText>} css={styles.checkBox}/>
        </Checkbox.Group>
        <Button<"button"> type="submit" styleType="primary" css={styles.submitButton}>Save</Button>
      </form>
    </div>
  );*/
};

export default ProfileNotificationsTabForm;
