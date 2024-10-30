/* eslint-disable max-lines */
import type { CaseOverviewPageProps } from "@/pages/cases";
import type { ArticleOverviewPageProps } from "@/pages/dictionary";

import { castDraft, enableMapSet } from "immer";
import { z } from "zod";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { areArraysEqualByKey } from "@/utils/array";
import { getIsValidKey } from "@/utils/object";
import { getUrlSearchParams } from "@/utils/utils";

enableMapSet();

export type FilterOption = {
  readonly label: string;
  readonly value: string | number;
};

type Filter = {
  clearFilters: () => void;
  filterOptions: FilterOption[];
  toggleFilter: (filter: FilterOption) => void;
};

// we cannot reuse the CaseProgressState type here because it does differentiate "in-progress" in two sub-states
export const statusesFilterOptions = [
  {
    label: "Offen",
    value: "open"
  },
  {
    label: "In Bearbeitung",
    value: "in-progress"
  },
  {
    label: "Abgeschlossen",
    value: "completed"
  },
] as const satisfies readonly FilterOption[];

export type StatusFilterOption = typeof statusesFilterOptions[number];

export const wasSeenFilterOptions = [
  {
    label: "Nicht gesehen",
    value: "not-seen"
  },
  {
    label: "Gesehen",
    value: "seen"
  },
] as const satisfies readonly FilterOption[];

export type WasSeenFilterOption = typeof wasSeenFilterOptions[number];

type FilterableArticleAttributes = keyof Pick<ArticleOverviewPageProps["items"][number], "legalArea" | "tags" | "topic" | "wasSeenFilterable">;
type FilterableCaseAttributes = keyof Pick<CaseOverviewPageProps["items"][number], "legalArea" | "tags" | "topic" | "progressStateFilterable">;
export type FilterableAttributes = FilterableArticleAttributes | FilterableCaseAttributes;

interface CommonFiltersSlice<FilterKey extends string>
{
  clearAllFilters: () => void;
  clearFilters: (key: FilterKey) => void;
  clearInvalidFilters: (currentlyValidFilterOptions: {
    [K in FilterKey]-?: FilterOption[];
  }) => void;
  closeDrawer: () => void;
  filters: Map<FilterKey, Filter>;
  getTotalFiltersCount: () => number;
  isDrawerOpened: boolean;
  openDrawer: () => void;
  setIsDrawerOpened: (isDrawerOpened: boolean) => void;
  toggleFilter: (key: FilterKey, filter: FilterOption) => void;
}

const filtersStoreStorageSchema = z.object({
  state: z.array(
    z.object({
      filterOptions: z.array(z.object({
        label: z.string(),
        value: z.union([z.string(), z.number()]),
      })),
      key: z.string(),
    })
  ),
  version: z.number().optional(),
});

type FiltersStorageSchema = z.infer<typeof filtersStoreStorageSchema>;

function createOverviewFiltersStore<FilterKey extends FilterableAttributes>(
  initialFilters: { [K in FilterKey]-?: FilterOption[] },
  storeName: string,
  /* activeOnPage: AppPath*/
)
{
  type Store = CommonFiltersSlice<FilterKey>;
  const filterKeys = Object.keys(initialFilters) as Array<keyof typeof initialFilters>;

  return createStore<Store>()(
    persist(
      immer(
        (set, get) => ({
          clearAllFilters: () =>
          {
            set((state) =>
            {
              for(const key of state.filters.keys())
              {
                state.filters.get(key)!.filterOptions = [];
              }
            });
          },
          clearFilters: (key) =>
          {
            set((state) =>
            {
              state.filters.get(castDraft(key))!.filterOptions = [];
            });
          },
          clearInvalidFilters: (currentlyValidFilterOptions) =>
          {
            set((state) =>
            {
              for(const key of state.filters.keys())
              {
                const activeFilterOptions = state.filters.get(key)!.filterOptions;
                const validFilterOptions = activeFilterOptions.filter(filterOption =>
                {
                  if(!getIsValidKey(currentlyValidFilterOptions, key))
                  {
                    return false;
                  }

                  return currentlyValidFilterOptions[key]?.some(validFilterOption => validFilterOption.value === filterOption.value);
                });

                if(areArraysEqualByKey(activeFilterOptions, validFilterOptions, "value"))
                {
                  continue;
                }

                state.filters.get(key)!.filterOptions = validFilterOptions;
              }
            });
          },
          closeDrawer: () => set({ isDrawerOpened: false }),
          filters: new Map(
            filterKeys.map(key => [
              key,
              {
                clearFilters: () => get().clearFilters(key),
                filterOptions: initialFilters[key],
                toggleFilter: (filter) => get().toggleFilter(key, filter),
              }
            ])
          ),
          getTotalFiltersCount: () => Array
            .from(get().filters.values())
            .reduce((count, f) => count + f.filterOptions.length, 0),
          isDrawerOpened: false,
          openDrawer: () => set({ isDrawerOpened: true }),
          setIsDrawerOpened: (isDrawerOpened) => set({ isDrawerOpened }),
          toggleFilter: (key, filter) =>
          {
            set((state) =>
            {
              const { filters } = state;

              const currentFilter = filters.get(castDraft(key));

              if(currentFilter == null)
              {
                return;
              }

              const filterIndex = currentFilter.filterOptions.findIndex(f => f.value === filter.value);
              const isFilterAlreadyAdded = filterIndex !== -1;

              if(isFilterAlreadyAdded)
              {
                currentFilter.filterOptions.splice(filterIndex, 1);
              }
              else
              {
                currentFilter.filterOptions.push(filter);
              }
            });
          },
        })
      ),
      {
        merge: (persistedStateUnknown, currentState) =>
        {
          // This is a bit ugly but for some reason the persistedState is of type unknown, although the return type of getItem is correct.
          // Validating/parsing it with zod again here does not make sense als we already have to parse it in the getItem method
          const persistedFilters = persistedStateUnknown as FiltersStorageSchema["state"];

          persistedFilters.forEach(({ filterOptions, key }) =>
          {
            const currentFilter = currentState.filters.get(key as FilterKey);

            if(!currentFilter)
            {
              return;
            }

            currentFilter.filterOptions = filterOptions;
          });

          return currentState;
        },
        name: storeName,
        partialize: (state) =>
        {
          const statePartialized: FiltersStorageSchema["state"] = Array.from(state.filters.keys()).map(key => ({
            filterOptions: state.filters.get(key)!.filterOptions,
            key
          }));

          return statePartialized;
        },
        storage: {
          getItem: (key) =>
          {
            let storedValue: string | null;

            if(getUrlSearchParams())
            {
              const searchParams = new URLSearchParams(getUrlSearchParams());
              storedValue = searchParams.get(key);
            }
            else
            {
              storedValue = localStorage.getItem(key);
            }

            if(storedValue == null)
            {
              return null;
            }

            let restoredState: z.infer<typeof filtersStoreStorageSchema>;

            try
            {
              const itemParsed = JSON.parse(storedValue);
              restoredState = filtersStoreStorageSchema.parse(itemParsed);
            }
            catch (e: unknown)
            {
              console.error("filters store could not be restored", e);
              return null;
            }

            return restoredState;
          },
          removeItem: (key) =>
          {
            const searchParams = new URLSearchParams(getUrlSearchParams());
            searchParams.delete(key);
            window.location.search = searchParams.toString();
          },
          setItem: (key, item) =>
          {
            const itemStringified = JSON.stringify(item);
            const searchParams = new URLSearchParams(getUrlSearchParams());

            searchParams.set(key, itemStringified);
            window.history.replaceState(null, "", `?${searchParams.toString()}`);
            localStorage.setItem(key, itemStringified);
          },
        }
      }
    )
  );
}

// disable the sorting rule because we want to keep the order of the filters as this is the order in which they are displayed in the drawer
/* eslint-disable sort-keys-fix/sort-keys-fix */
export const useCasesOverviewFiltersStore = createOverviewFiltersStore(
  {
    progressStateFilterable: [],
    legalArea: [],
    topic: [],
    tags: [],
  },
  "cases-filters",
);

export const useArticlesOverviewFiltersStore = createOverviewFiltersStore(
  {
    legalArea: [],
    tags: [],
    topic: [],
    wasSeenFilterable: [],
  }, 
  "articles-filters",
);
/* eslint-enable sort-keys-fix/sort-keys-fix */

export type CasesOverviewFiltersStore = CommonFiltersSlice<FilterableCaseAttributes>;
export type ArticlesOverviewFiltersStore = CommonFiltersSlice<FilterableArticleAttributes>;
export type CommonOverviewFiltersStore = CasesOverviewFiltersStore | ArticlesOverviewFiltersStore;
