import { type GenderIdentifier } from "@/db/schema";

type Gender = {
  readonly identifier: GenderIdentifier;
  label: string;
};

export const allUniversities = [
  "Universität Augsburg",
  "Universität Bayreuth",
  "EBS Universität für Wirtschaft und Recht",
  "Freie Universität Berlin",
  "Humboldt-Universität zu Berlin",
  "Universität Bielefeld",
  "Ruhr-Universität Bochum",
  "Rheinische Friedrich-Wilhelms-Universität Bonn",
  "Universität Bremen",
  "Heinrich-Heine-Universität Düsseldorf",
  "Friedrich-Alexander-Universität Erlangen-Nürnberg",
  "Johann-Wolfgang-Goethe-Universität Frankfurt am Main",
  "Europa-Universität Viadrina Frankfurt (Oder)",
  "Albert-Ludwigs-Universität Freiburg",
  "Justus-Liebig-Universität Gießen",
  "Georg-August-Universität Göttingen",
  "Universität Greifswald",
  "Fernuniversität in Hagen",
  "Martin-Luther-Universität Halle-Wittenberg",
  "Universität Hamburg",
  "Bucerius Law School",
  "Gottfried Wilhelm Leibniz Universität Hannover",
  "Ruprecht-Karls-Universität Heidelberg",
  "Friedrich-Schiller-Universität Jena",
  "Christian-Albrechts-Universität zu Kiel",
  "Universität zu Köln",
  "Universität Konstanz",
  "Universität Leipzig",
  "Johannes Gutenberg-Universität Mainz",
  "Universität Mannheim",
  "Philipps-Universität Marburg",
  "Ludwig-Maximilians-Universität München",
  "Westfälische Wilhelms-Universität Münster",
  "Universität Osnabrück",
  "Universität Passau",
  "Universität Potsdam",
  "Universität Regensburg",
  "Universität des Saarlandes",
  "Universität Trier",
  "Eberhard Karls Universität Tübingen",
  "Julius-Maximilians-Universität Würzburg",
] as const;

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
