import {
  type ArticlesOverviewFiltersDrawerProps,
  type CasesOverviewFiltersDrawerProps,
  type OverviewFiltersDrawerContentProps
} from "@/components/pages/OverviewPage/overviewFiltersDrawer/OverviewFiltersDrawer";
import {
  type ArticlesOverviewFiltersStore,
  type CasesOverviewFiltersStore,
  type CommonFiltersSlice,
  type CommonOverviewFiltersStore,
  type FilterableArticleAttributes,
  type FilterableCaseAttributes,
  type FilterOption
} from "@/stores/overviewFilters.store";
import { findIntersection } from "@/utils/array";
import { type NullableProperties } from "@/utils/types";
import { objectKeys } from "@/utils/utils";

export const sortFilterOptions = (a: FilterOption, b: FilterOption): number =>
{
  const aStartsWithParagraph = a.title.startsWith("§");
  const bStartsWithParagraph = b.title.startsWith("§");

  if(!aStartsWithParagraph && bStartsWithParagraph)
  {
    return -1;
  }

  if(aStartsWithParagraph && !bStartsWithParagraph)
  {
    return 1;
  }

  return a.title.localeCompare(b.title);
};

type GetUniqueFilterOptionsFromCasesProps = {
  filters: CasesOverviewFiltersStore["filters"];
  inputFilterKey: FilterableCaseAttributes;
  items: CasesOverviewFiltersDrawerProps["items"];
  variant: CasesOverviewFiltersDrawerProps["variant"];
};

type GetUniqueFilterOptionsFromArticlesProps = {
  filters: ArticlesOverviewFiltersStore["filters"];
  inputFilterKey: FilterableArticleAttributes;
  items: ArticlesOverviewFiltersDrawerProps["items"];
  variant: ArticlesOverviewFiltersDrawerProps["variant"];
};

type GetUniqueFilterOptions = (props: GetUniqueFilterOptionsFromCasesProps | GetUniqueFilterOptionsFromArticlesProps) => FilterOption[];

export function getFilterOptions<
  Item extends (CasesOverviewFiltersDrawerProps["items"][number] | ArticlesOverviewFiltersDrawerProps["items"][number]),
  InputFilterKey extends keyof Item
>(
  filters: {
    [K in keyof (typeof items)[number]]: FilterOption[];
  },
  inputFilterKey: InputFilterKey,
  items: CasesOverviewFiltersDrawerProps["items"] | ArticlesOverviewFiltersDrawerProps["items"]
): Array<Item[InputFilterKey]>
{
  const filteredSets = Object
    .keys(filters)
    .map((filterKey) =>
    {
      if(filterKey === inputFilterKey)
      {
      // we filter out items by all filters except the current filter key, so if the current filter key is legalArea, we filter out by all filters but legalArea
        return null;
      }

      // these are for example all topics we currently filter by
      const currentFilterOptions = filters[filterKey as keyof typeof filters]!;

      // filteredOptions is an array of either tags, topics or legalAreas, depending on the current filter key
      const filteredOptions = items
        .map(item =>
        {
        // get the values from the current filter key, for example: legalArea, tags or topics
          const itemValuesFromCurrentFilter = item[filterKey as keyof (typeof items)[number]];

          // for example tags or topics are arrays (items can have multiple), so we check if the current item matches any of the filtered tags or topics
          if(Array.isArray(itemValuesFromCurrentFilter))
          {
          // TODO: Check if this is correct/necessary and also check if we can return early by checking currentFilterOptions.length === 0
            if(itemValuesFromCurrentFilter.length === 0)
            {
              return null;
            }

            if(currentFilterOptions?.length === 0 || itemValuesFromCurrentFilter.some((value) => currentFilterOptions.some(filterOption => filterOption.id === value?.id)))
            {
            // if the current item matches any of the filtered tags or topics, we return the tags or topics of the current item
              return item[inputFilterKey as keyof typeof item];
            }
          }
          // for example legalArea is an object (item can only have one), so we check if the current item matches the filtered legalAreas
          else if(
            currentFilterOptions?.length === 0 ||
          (
            itemValuesFromCurrentFilter != null &&
            typeof itemValuesFromCurrentFilter === "object" &&
            "id" in itemValuesFromCurrentFilter &&
            currentFilterOptions.some(filterOption => filterOption.id === itemValuesFromCurrentFilter?.id)
          )
          )
          {
          // if the current item matches the filtered legalAreas, we return the legalArea of the current item
            return item[inputFilterKey as keyof typeof item];
          }

          return null;
        })
        .flat()
        .filter(Boolean);

      return filteredOptions;
    })
    .flat()
    .filter(Boolean);

  console.log("filteredSets", filteredSets);

  return filteredSets;
}

// export function getUniqueFilterOptions<
//   Item extends (CasesOverviewFiltersDrawerProps["items"][number] | ArticlesOverviewFiltersDrawerProps["items"][number]),
//   Filters extends (CasesOverviewFiltersStore["filters"] | ArticlesOverviewFiltersStore["filters"])
// >(
//   filters: Filters,
//   inputFilterKey: keyof Item,
//   items: Item[]
// )
// {
//   // filteredSets is an array of a filter options arrays
//   const filteredSets: FilterOption[][] = [];
//
//   for(const filterKey of objectKeys(filters))
//   {
//     if(filterKey === inputFilterKey)
//     {
//       // we filter out items by all filters except the current filter key, so if the current filter key is legalArea, we filter out by all filters but legalArea
//       continue;
//     }
//
//     // these are for example all topics we currently filter by
//     const currentFilterOptions = filters[filterKey];
//
//     // filteredOptions is an array of either tags, topics or legalAreas, depending on the current filter key
//     const filteredOptions: FilterOption[] = items
//       .map(item =>
//       {
//         // get the values from the current filter key, for example: legalArea, tags or topics
//         const itemValuesFromCurrentFilter = item[filterKey];
//
//         // for example tags or topics are arrays (items can have multiple), so we check if the current item matches any of the filtered tags or topics
//         if(Array.isArray(itemValuesFromCurrentFilter))
//         {
//           // TODO: Check if this is correct/necessary and also check if we can return early by checking currentFilterOptions.length === 0
//           if(itemValuesFromCurrentFilter.length === 0)
//           {
//             return null;
//           }
//
//           if(currentFilterOptions?.length === 0 || itemValuesFromCurrentFilter.some((value) => currentFilterOptions.some(filterOption => filterOption.id === value?.id)))
//           {
//             // if the current item matches any of the filtered tags or topics, we return the tags or topics of the current item
//             return item[inputFilterKey];
//           }
//         }
//         // for example legalArea is an object (item can only have one), so we check if the current item matches the filtered legalAreas
//         else if(currentFilterOptions?.length === 0 || currentFilterOptions.some(filterOption => filterOption.id === itemValuesFromCurrentFilter?.id))
//         {
//           // if the current item matches the filtered legalAreas, we return the legalArea of the current item
//           return item[inputFilterKey];
//         }
//
//         return null;
//       })
//       .flat()
//       .map(item =>
//       {
//         let filterOption: NullableProperties<FilterOption> | null = null;
//
//         switch (item?.__typename)
//         {
//           case "LegalArea":
//           {
//             filterOption = {
//               id: item.id,
//               title: item.legalAreaName
//             };
//             break;
//           }
//           case "Topic":
//           {
//             filterOption = {
//               id: item.id,
//               title: item.topicName
//             };
//             break;
//           }
//           case "Tags":
//           {
//             filterOption = {
//               id: item.id,
//               title: item.tagName
//             };
//             break;
//           }
//           case undefined:
//           {
//             filterOption = null;
//             break;
//           }
//         }
//
//         if(filterOption == null || filterOption.id == null || filterOption.title == null)
//         {
//           return null;
//         }
//
//         return ({
//           id: filterOption.id,
//           title: filterOption.title,
//         });
//       })
//       .filter(Boolean);
//
//     if(filteredOptions.length === 0)
//     {
//       continue;
//     }
//
//     filteredSets.push(Array.from(new Map(filteredOptions.map(item => [item.id, item])).values()));
//   }
//
//   return findIntersection(filteredSets, "id");
// }

