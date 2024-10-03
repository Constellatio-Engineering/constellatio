import { type ArticlesPageProps, type CasesPageProps, type OverviewPageProps } from "@/components/pages/OverviewPage/OverviewPage";
import type { IGenLegalArea } from "@/services/graphql/__generated/sdk";
import type { CommonOverviewFiltersStore, FilterOption } from "@/stores/overviewFilters.store";
import { getIsObjectWithId, getIsObjectWithValue, getIsPrimitive, objectKeys } from "@/utils/utils";

export function getItemsMatchingTheFilters<Item extends OverviewPageProps["items"][number]>(
  items: Item[],
  filters: {
    [K in keyof Item]?: {
      filterOptions: FilterOption[];
    }
  },
): Item[]
{
  const filterKeys = Object.keys(filters) as Array<keyof typeof filters>;

  return items.filter(item =>
  {
    const filterResults = filterKeys.map(filterKey =>
    {
      if(!Object.hasOwn(filters, filterKey))
      {
        console.error(`Filter ${filterKey} not found in filters object`);
        return false;
      }

      const currentFilterOptions = filters[filterKey]!.filterOptions;
      const itemValueFromCurrentFilter = item[filterKey];

      if(currentFilterOptions?.length === 0)
      {
        return true;
      }

      if(Array.isArray(itemValueFromCurrentFilter))
      {
        return itemValueFromCurrentFilter.some((value) =>
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
      }
      else if(getIsObjectWithId(itemValueFromCurrentFilter))
      {
        if(currentFilterOptions.some(filterOption => filterOption.value === itemValueFromCurrentFilter.id))
        {
          return true;
        }
      }
      else if(getIsObjectWithValue(itemValueFromCurrentFilter))
      {
        if(currentFilterOptions.some(filterOption => filterOption.value === itemValueFromCurrentFilter.value))
        {
          return true;
        }
      }
      else if(getIsPrimitive(itemValueFromCurrentFilter))
      {
        if(currentFilterOptions.some(filterOption => filterOption.value === itemValueFromCurrentFilter))
        {
          return true;
        }
      }

      return false;
    });

    return filterResults.every(Boolean);
  });
}

export type LegalAreaWithItems = {
  items: Array<CasesPageProps["items"][number] | ArticlesPageProps["items"][number]>;
  legalArea: IGenLegalArea;
};

export function getLegalAreasWithItems(items: Array<OverviewPageProps["items"][number]>): LegalAreaWithItems[]
{
  const map = new Map<string, LegalAreaWithItems>();

  for(const item of items)
  {
    const { legalArea } = item;

    if(legalArea?.legalAreaName == null || legalArea.id == null)
    {
      continue;
    }

    if(!map.has(legalArea.id))
    {
      map.set(legalArea.id, {
        items: [],
        legalArea
      });
    }

    map.get(legalArea.id)!.items.push(item);
  }

  const entriesSorted = Array
    .from(map.values())
    .sort((a, b) =>
    {
      if(a.legalArea.sorting === null)
      {
        return 1;
      }
      if(b.legalArea.sorting === null)
      {
        return -1;
      }
      return a.legalArea.sorting! - b.legalArea.sorting!;
    });

  return entriesSorted;
}
