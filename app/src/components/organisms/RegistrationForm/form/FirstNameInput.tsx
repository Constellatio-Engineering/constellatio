import { Input } from "@/components/atoms/Input/Input";

import { type TextInputProps } from "@mantine/core";
import React, { type FunctionComponent } from "react";

const FirstNameInput: FunctionComponent<TextInputProps> = (props) => (
  <Input
    {...props}
    inputType="text"
    label="Vorname (optional)"
    title="Vorname"
    placeholder="Maximilian"
  />
);

export default FirstNameInput;
