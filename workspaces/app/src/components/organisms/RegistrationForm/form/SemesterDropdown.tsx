import { Dropdown, type DropdownProps } from "@/components/atoms/Dropdown/Dropdown";
import { maximumAmountOfSemesters } from "@/schemas/auth/userData.validation";
import { transformSemesterToString } from "@/utils/data-transformation";

import { Box } from "@mantine/core";
import React, { type FunctionComponent } from "react";

type Props = Omit<DropdownProps, "data">;

const SemesterDropdown: FunctionComponent<Props> = (props) => (
  <Box maw={240}>
    <Dropdown
      {...props}
      label="Semester (optional)"
      title="Semester"
      placeholder="Semester auswählen"
      data={Array(maximumAmountOfSemesters + 1).fill(null).map((_, i) => ({
        label: transformSemesterToString(i, true),
        value: String(i)
      }))}
      clearable
      allowDeselect
      nothingFound="Semester nicht gefunden..."
      searchable
    />
  </Box>
);

export default SemesterDropdown;
