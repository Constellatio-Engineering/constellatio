/* eslint-disable max-lines */

import type { CaseOverviewPageItems } from "@/pages/cases";
import { type FilterOption } from "@/stores/overviewFilters.store";
import { getIsValidKey } from "@/utils/object";
import { type NullableProperties } from "@/utils/types";
import { getIsObjectWithId, getIsObjectWithValue, getIsPrimitive, objectKeys } from "@/utils/utils";

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
    [K in keyof Item]?: {
      filterOptions: FilterOption[];
    }
  },
  inputFilterKey: InputFilterKey,
  items: Items
)
{
  // const filterKeys = Object.keys(filters) as Array<keyof typeof filters>;
  const filterKeys = objectKeys(filters);

  const filteredSets = filterKeys
    .map((filterKey) =>
    {
      if(filterKey === inputFilterKey)
      {
        return null;
      }

      if(!getIsValidKey(filters, filterKey))
      {
        console.error(`Filter ${filterKey} not found in filters object`, filters);
        return null;
      }

      const currentFilterOptions = filters[filterKey]!.filterOptions;

      const filteredOptions = items
        .map(item =>
        {
          if(!(inputFilterKey in item))
          {
            return null;
          }

          if(!(filterKey in item))
          {
            return null;
          }

          // this should not be necessary, but typescript is not smart enough to infer the type of filterKey and inputFilterKey after the check above
          const filterKeyValidated = filterKey as keyof typeof item;
          const inputFilterKeyValidated = inputFilterKey as keyof typeof item;

          if(!currentFilterOptions || currentFilterOptions.length === 0)
          {
            return item[inputFilterKeyValidated];
          }

          const itemValueFromCurrentFilter = item[filterKeyValidated];

          if(itemValueFromCurrentFilter == null)
          {
            return null;
          }

          if(Array.isArray(itemValueFromCurrentFilter))
          {
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
              else if(getIsObjectWithValue(value))
              {
                return currentFilterOptions.some(filterOption => filterOption.value === value.value);
              }
              else if(getIsPrimitive(value))
              {
                return currentFilterOptions.some(filterOption => filterOption.value === value);
              }

              return false;
            });

            if(doesItemMatchFilter)
            {
              return item[inputFilterKeyValidated];
            }
          }
          else if(getIsObjectWithId(itemValueFromCurrentFilter))
          {
            if(currentFilterOptions.some(filterOption => filterOption.value === itemValueFromCurrentFilter.id))
            {
              return item[inputFilterKeyValidated];
            }
          }
          else if(getIsObjectWithValue(itemValueFromCurrentFilter))
          {
            if(currentFilterOptions.some(filterOption => filterOption.value === itemValueFromCurrentFilter.value))
            {
              return item[inputFilterKeyValidated];
            }
          }
          else if(getIsPrimitive(itemValueFromCurrentFilter))
          {
            if(currentFilterOptions.some(filterOption => filterOption.value === itemValueFromCurrentFilter))
            {
              return item[inputFilterKeyValidated];
            }
          }

          return null;
        })
        .flat()
        .filter(Boolean);

      return filteredOptions;
    })
    .filter(Boolean);

  return filteredSets as Array<Array<Value extends Array<infer U> ? NonNullable<U> : NonNullable<Value>>>;
}

export function itemValuesToFilterOptions(
  values: Array<
  Partial<CaseOverviewPageItems["legalArea"]> |
  NonNullable<CaseOverviewPageItems["topic"]>[number] |
  NonNullable<CaseOverviewPageItems["tags"]>[number]
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
    .filter(Boolean)
    .sort(sortFilterOptions);

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

