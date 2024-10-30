import { Dropdown, type DropdownProps } from "@/components/atoms/Dropdown/Dropdown";

import { allUniversityNames } from "@constellatio/schemas/common/auth/userData.validation";
import React, { type FunctionComponent } from "react";

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
