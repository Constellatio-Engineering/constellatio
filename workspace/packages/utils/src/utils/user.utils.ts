import type { Nullable } from "@constellatio/utility-types";

type SplitFullName = (fullName: Nullable<string>) => {
  firstName: string | null;
  lastName: string | null;
};

export const splitFullName: SplitFullName = (fullName) =>
{
  if(!fullName)
  {
    return {
      firstName: null,
      lastName: null
    };
  }

  const parts = fullName.trim().split(/\s+/);

  if(parts.length === 1)
  {
    return {
      firstName: parts[0]!,
      lastName: null
    };
  }

  // Take last part as family name, everything else as given name
  const lastName = parts.pop()!;
  const firstName = parts.join(" ");

  return {
    firstName,
    lastName
  };
};
