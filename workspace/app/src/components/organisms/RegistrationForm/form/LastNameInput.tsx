import { Input } from "@/components/atoms/Input/Input";

import { type TextInputProps } from "@mantine/core";
import { type FunctionComponent } from "react";

const LastNameInput: FunctionComponent<TextInputProps> = (props) => (
  <Input
    {...props}
    inputType="text"
    label="Nachname (optional)"
    title="Nachname"
    placeholder="Mustermann"
  />
);

export default LastNameInput;
