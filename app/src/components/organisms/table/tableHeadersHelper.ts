import { type ITableProps } from "./Table";

type ITableHeaders = {
  title: string;
};

export const tableHeaders = ({
  tableType
}: {
  tableType: ITableProps["tableType"];
}): ITableHeaders[] => 
{
  switch (tableType.type) 
  {
    case "cases":
      switch (tableType.variant) 
      {
        case "all-cases":
          return [
            {
              title: "Fälle",
            },
            {
              title: "Status",
            },
            {
              title: "Bearbeitungszeit",
            },
            {
              title: "legal felid",
            },
            {
              title: "Rechtsgebiet",
            },
            {
              title: "",
            },
          ];

        case "cases":
          return [
            {
              title: "Fälle",
            },
            {
              title: "Status",
            },
            {
              title: "Bearbeitungszeit",
            },
            {
              title: "Thema",
            },
            {
              title: "",
            },
          ];

        case "favorites":
          return [
            {
              title: "Fälle",
            },
            {
              title: "Status",
            },
            {
              title: "Bearbeitungszeit",
            },
            {
              title: "Rechtsgebiet",
            },
            {
              title: "Thema",
            },
            {
              title: "",
            },
          ];

        case "search":
          return [
            {
              title: "Fälle",
            },
            {
              title: "Status",
            },
            {
              title: "Bearbeitungszeit",
            },
            {
              title: "Rechtsgebiet",
            },
            {
              title: "Thema",
            },
            {
              title: "",
            },
          ];

        default:
          console.error("tableType.variant is not defined", tableType);
          return [];
      }

    case "dictionary":
      switch (tableType.variant) 
      {
        case "dictionary":
          return [
            {
              title: "Artikel",
            },
            {
              title: "Thema",
            },
            {
              title: "",
            },
          ];

        case "favorites":
          return [
            {
              title: "Artikel",
            },
            {
              title: "Rechtsgebiet",
            },
            {
              title: "Thema",
            },
            {
              title: "",
            },
            // {
            //   title: "",
            // },
          ];

        case "search":
          return [
            {
              title: "Artikel",
            },
            {
              title: "Rechtsgebiet",
            },
            {
              title: "Thema",
            },
            {
              title: "",
            },
          ];
      }

    default:
      console.error("Invalid table type", tableType);
      return [];
  }
};
