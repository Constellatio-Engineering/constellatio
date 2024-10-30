import { Dropdown, type DropdownProps } from "@/components/atoms/Dropdown/Dropdown";

import React, { type FunctionComponent } from "react";

import { allUniversityNames } from "@/schemas/auth/userData.validation";

type Props = Omit<DropdownProps, "data">;

const UniversityDropdown: FunctionComponent<Props> = (props) => (
  <Dropdown
    {...props}
    label="Universität (optional)"
    title="Universität"
    placeholder="Universität auswählen"
    clearable
    allowDeselect
    data={allUniversityNames}
    nothingFound="Keine Universität gefunden..."
    searchable
  />
);

export default UniversityDropdown;
