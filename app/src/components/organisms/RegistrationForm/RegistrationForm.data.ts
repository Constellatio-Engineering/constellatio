import { type GenderIdentifier } from "@/db/schema";

type Gender = {
  readonly identifier: GenderIdentifier;
  label: string;
};

export const allUniversities = [
  "Albert-Ludwigs-Universität Freiburg",
  "Bucerius Law School",
  "Christian-Albrechts-Universität zu Kiel",
  "EBS Universität für Wirtschaft und Recht",
  "Eberhard Karls Universität Tübingen",
  "Europa-Universität Viadrina Frankfurt (Oder)",
  "Fernuniversität in Hagen",
  "Freie Universität Berlin",
  "Friedrich-Alexander-Universität Erlangen-Nürnberg",
  "Friedrich-Schiller-Universität Jena",
  "Georg-August-Universität Göttingen",
  "Gottfried Wilhelm Leibniz Universität Hannover",
  "Heinrich-Heine-Universität Düsseldorf",
  "Humboldt-Universität zu Berlin",
  "Johann-Wolfgang-Goethe-Universität Frankfurt am Main",
  "Johannes Gutenberg-Universität Mainz",
  "Julius-Maximilians-Universität Würzburg",
  "Justus-Liebig-Universität Gießen",
  "Ludwig-Maximilians-Universität München",
  "Martin-Luther-Universität Halle-Wittenberg",
  "Philipps-Universität Marburg",
  "Rheinische Friedrich-Wilhelms-Universität Bonn",
  "Ruhr-Universität Bochum",
  "Ruprecht-Karls-Universität Heidelberg",
  "Universität Augsburg",
  "Universität Bayreuth",
  "Universität Bielefeld",
  "Universität Bremen",
  "Universität Greifswald",
  "Universität Hamburg",
  "Universität Konstanz",
  "Universität Leipzig",
  "Universität Mannheim",
  "Universität Osnabrück",
  "Universität Passau",
  "Universität Potsdam",
  "Universität Regensburg",
  "Universität Trier",
  "Universität des Saarlandes",
  "Universität zu Köln",
  "Westfälische Wilhelms-Universität Münster",
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
