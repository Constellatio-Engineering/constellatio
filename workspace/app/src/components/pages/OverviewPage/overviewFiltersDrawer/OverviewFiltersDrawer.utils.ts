/* eslint-disable max-lines */

import type { CaseOverviewPageItems } from "@/pages/cases";
import { type FilterableAttributes, type FilterOption } from "@/stores/overviewFilters.store";
import { type NullableProperties } from "@/utils/types";

import { getIsValidKey } from "@/utils/object";
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

type FilterLabels = { searchesFor: string | null; title: string };

export function getFilterLabels(filterKey: FilterableAttributes): FilterLabels
{ 
  let label: FilterLabels;

  switch (filterKey)
  {
    case "legalArea":
    {
      label = {
        searchesFor: "Rechtsgebieten",
        title: "Rechtsgebiet"
      };
      break;
    }
    case "topic":
    {
      label = {
        searchesFor: "Themen",
        title: "Thema"
      };
      break;
    }
    case "tags":
    {
      label = {
        searchesFor: "Tags",
        title: "Tags"
      };
      break;
    }
    case "progressStateFilterable":
    {
      label = {
        searchesFor: null,
        title: "Bearbeitungsstatus"
      };
      break;
    }
    case "wasSeenFilterable":
    {
      label = {
        searchesFor: null,
        title: "Bearbeitungsstatus"
      };
      break;
    }
  }
  return label;
}
