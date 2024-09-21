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
    case "Forum": return "forumQuestions";
    case "Dateien & Docs": return "userUploads";
    default:
    {
      console.error(`Unknown item tab at convertTabsAsSearchResultsKey: ${item.label}`);
      return "articles";
    }
  }
};

export const convertTabQueryAsItemTab = (query: string): string =>
{
  switch (query)
  {
    case "cases": return "in Fälle";
    case "articles": return "im Lexikon";
    case "forumQuestions": return "im Forum";
    case "userUploads": case "userDocuments": return "in  Dateien & Docs";
    default:
    {
      console.error(`Unknown tab query at convertTabQueryAsItemTab: ${query}`);
      return "Lexikon";
    }
  }
};
