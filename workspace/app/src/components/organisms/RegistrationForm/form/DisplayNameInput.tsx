import { Input } from "@/components/atoms/Input/Input";

import { type TextInputProps } from "@mantine/core";
import { type FunctionComponent } from "react";

const DisplayNameInput: FunctionComponent<TextInputProps> = (props) => (
  <Input
    {...props}
    inputType="text"
    label="Anzeigename*"
    title="Anzeigename"
    placeholder="Max"
  />
);

export default DisplayNameInput;
