/* eslint-disable max-lines */

import {
  type ArticlesOverviewFiltersDrawerProps,
  type CasesOverviewFiltersDrawerProps,
  type OverviewFiltersDrawerContentProps
} from "@/components/pages/OverviewPage/overviewFiltersDrawer/OverviewFiltersDrawer";
import type { CaseOverviewPageItems } from "@/pages/cases";
import {
  type ArticlesOverviewFiltersStore,
  type CasesOverviewFiltersStore,
  type CommonFiltersSlice,
  type CommonOverviewFiltersStore,
  type FilterableArticleAttributes,
  type FilterableCaseAttributes,
  type FilterOption, statusesFilterOptions
} from "@/stores/overviewFilters.store";
import { findIntersection } from "@/utils/array";
import { type NullableProperties } from "@/utils/types";
import { getIsObjectWithId, getIsPrimitive, objectKeys } from "@/utils/utils";

export const sortFilterOptions = (a: FilterOption, b: FilterOption): number =>
{
  const aStartsWithParagraph = a.label.startsWith("§");
  const bStartsWithParagraph = b.label.startsWith("§");

  if(!aStartsWithParagraph && bStartsWithParagraph)
  {
    return -1;
  }

  if(aStartsWithParagraph && !bStartsWithParagraph)
  {
    return 1;
  }

  return a.label.localeCompare(b.label);
};

export function getFilterOptions<
  Items extends Array<Record<string, unknown>>,
  Item extends Items[number],
  InputFilterKey extends keyof Items[number],
  Value extends NonNullable<Item[InputFilterKey]>
>(
  filters: {
    [K in keyof Item]?: FilterOption[];
  },
  inputFilterKey: InputFilterKey,
  items: Items
)
{
  const filteredSets = Object
    .keys(filters)
    .map((filterKey) =>
    {
      if(filterKey === inputFilterKey)
      {
        return null;
      }

      const currentFilterOptions = filters[filterKey as keyof typeof filters];

      const filteredOptions = items
        .map(item =>
        {
          if(!currentFilterOptions || currentFilterOptions.length === 0)
          {
            return item[inputFilterKey as keyof typeof item];
          }

          const itemValueFromCurrentFilter = item[filterKey as keyof typeof item];

          if(itemValueFromCurrentFilter == null)
          {
            return null;
          }

          if(Array.isArray(itemValueFromCurrentFilter))
          {
            if(itemValueFromCurrentFilter.length === 0)
            {
              return null;
            }

            const doesItemMatchFilter = itemValueFromCurrentFilter.some((value) =>
            {
              if(value == null)
              {
                return false;
              }

              if(getIsObjectWithId(value))
              {
                return currentFilterOptions.some(filterOption => filterOption.value === value.id);
              }
              else if(getIsPrimitive(value))
              {
                return currentFilterOptions.some(filterOption => filterOption.value === value);
              }

              return false;
            });

            if(doesItemMatchFilter)
            {
              return item[inputFilterKey as keyof typeof item];
            }
          }
          else if(getIsObjectWithId(itemValueFromCurrentFilter))
          {
            if(currentFilterOptions.some(filterOption => filterOption.value === itemValueFromCurrentFilter.id))
            {
              return item[inputFilterKey as keyof typeof item];
            }
          }
          else if(getIsPrimitive(itemValueFromCurrentFilter))
          {
            if(currentFilterOptions.some(filterOption => filterOption.value === itemValueFromCurrentFilter))
            {
              return item[inputFilterKey as keyof typeof item];
            }
          }

          return null;
        })
        .flat()
        .filter(Boolean);

      return filteredOptions;
    })
    .flat()
    .filter(Boolean);

  return filteredSets as Value extends Array<infer U> ? Array<NonNullable<U>> : Array<NonNullable<Value>>;
}

export function itemValuesToFilterOptions(
  values: Array<
  Partial<CaseOverviewPageItems["legalArea"]> |
  NonNullable<CaseOverviewPageItems["topic"]>[number] |
  NonNullable<CaseOverviewPageItems["tags"]>[number] |
  NonNullable<CaseOverviewPageItems["progressState"]>
  >
): FilterOption[]
{
  const filterOptions: FilterOption[] = values
    .map(value =>
    {
      if(value == null)
      {
        return null;
      }

      if(typeof value === "string")
      {
        return statusesFilterOptions.find(status => status.value === value);
      }

      let filterOption: NullableProperties<FilterOption> | null = null;

      switch (value.__typename)
      {
        case "LegalArea":
        {
          filterOption = {
            label: value.legalAreaName,
            value: value.id
          };
          break;
        }
        case "Topic":
        {
          filterOption = {
            label: value.topicName,
            value: value.id
          };
          break;
        }
        case "Tags":
        {
          filterOption = {
            label: value.tagName,
            value: value.id
          };
          break;
        }
        case undefined:
        {
          filterOption = null;
          break;
        }
      }

      if(filterOption == null || filterOption.label == null || filterOption.value == null)
      {
        return null;
      }

      return ({
        label: filterOption.label,
        value: filterOption.value,
      });
    })
    .filter(Boolean);

  return filterOptions;
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

