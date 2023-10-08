import { type ITableProps } from "./Table";

type ITableHeaders = {
  title: string;
};

export const tableHeaders = ({
  tableType,
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
              title: "case",
            },
            {
              title: "status",
            },
            {
              title: "duration",
            },
            {
              title: "legal felid",
            },
            {
              title: "legal area",
            },
            {
              title: "",
            },
          ];

        case "cases":
          return [
            {
              title: "case",
            },
            {
              title: "status",
            },
            {
              title: "duration",
            },
            {
              title: "topic",
            },
            {
              title: "",
            },
          ];

        case "favorites":
          return [
            {
              title: "case",
            },
            {
              title: "status",
            },
            {
              title: "duration",
            },
            {
              title: "legal area",
            },
            {
              title: "topic",
            },
            {
              title: "",
            },
            {
              title: "",
            },
          ];

        case "search":
          return [
            {
              title: "case",
            },
            {
              title: "status",
            },
            {
              title: "duration",
            },
            {
              title: "legal area",
            },
            {
              title: "topic",
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
              title: "article",
            },
            {
              title: "topic",
            },
            {
              title: "",
            },
          ];

        case "favorites":
          return [
            {
              title: "article",
            },
            {
              title: "legal area",
            },
            {
              title: "topic",
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
              title: "article",
            },
            {
              title: "legal area",
            },
            {
              title: "topic",
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
