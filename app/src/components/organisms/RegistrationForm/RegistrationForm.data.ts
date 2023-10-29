import { type GenderIdentifier } from "@/db/schema";

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
