import { Dropdown, type DropdownProps } from "@/components/atoms/Dropdown/Dropdown";
import { type GenderIdentifier } from "@/db/schema";

import { Box } from "@mantine/core";
import React, { type FunctionComponent } from "react";

type Gender = {
  readonly identifier: GenderIdentifier;
  label: string;
};

export const allGenders: Gender[] = [
  {
    identifier: "male",
    label: "männlich"
  },
  {
    identifier: "female",
    label: "weiblich"
  },
  {
    identifier: "diverse",
    label: "divers"
  }
];

type Props = Omit<DropdownProps, "data">;

const GenderDropdown: FunctionComponent<Props> = (props) => (
  <Box maw={240}>
    <Dropdown
      {...props}
      label="Geschlecht*"
      title="Geschlecht"
      placeholder="Geschlecht auswählen"
      data={allGenders.map(gender => ({ label: gender.label, value: gender.identifier }))}
    />
  </Box>
);

export default GenderDropdown;
