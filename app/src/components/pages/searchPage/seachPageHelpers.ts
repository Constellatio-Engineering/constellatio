import { type SearchResultsKey } from "@/hooks/useSearchResults";

export type TabItemType = {
  label: string;
  resultsCount: number;
};

export const convertTabsAsSearchResultsKey = (item: TabItemType): SearchResultsKey => 
{
  switch (item.label)
  {
    case "Fälle": return "cases"; 
    case "Lexikon": return "articles"; 
    case "Deine Dateien": return "userUploads"; 
    default:
    {
      console.error(`Unknown item tab at convertTabsAsSearchResultsKey: ${item.label}`);
      return "cases";
    }
  }
};

export const convertTabQueryAsItemTab = (query: string): string =>
{
  switch (query)
  {
    case "cases": return "Fälle"; 
    case "articles": return "Lexikon"; 
    case "userUploads": return "Deine Dateien"; 
    default:
    {
      console.error(`Unknown tab query at convertTabQueryAsItemTab: ${query}`);
      return "Lexikon";
    }
  }
};
