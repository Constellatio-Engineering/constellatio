import { Dropdown, type DropdownProps } from "@/components/atoms/Dropdown/Dropdown";
import { allUniversities, maximumAmountOfSemesters } from "@/schemas/auth/userData.validation";

import { Box } from "@mantine/core";
import React, { type FunctionComponent } from "react";

type Props = Omit<DropdownProps, "data">;

const SemesterDropdown: FunctionComponent<Props> = (props) => (
  <Box maw={240}>
    <Dropdown
      {...props}
      label="Semester*"
      title="Semester"
      placeholder="Semester auswählen"
      data={Array(maximumAmountOfSemesters + 1).fill(null).map((_, i) =>
      {
        if(i === 0)
        {
          return ({
            label: "Referendariat",
            value: String(i)
          });
        }
        else if(i === maximumAmountOfSemesters)
        {
          return ({
            label: `> ${maximumAmountOfSemesters - 1}`,
            value: String(i)
          });
        }
        return ({
          label: String(i),
          value: String(i)
        });
      })}
    />
  </Box>
);

export default SemesterDropdown;
