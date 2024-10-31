import { Input } from "@/components/atoms/Input/Input";

import { type TextInputProps } from "@mantine/core";
import { type FunctionComponent } from "react";

const EmailInput: FunctionComponent<TextInputProps> = (props) => (
  <Input
    {...props}
    inputType="text"
    label="E-Mail*"
    title="E-Mail"
    placeholder="max.mustermann@mail.com"
  />
);

export default EmailInput;
