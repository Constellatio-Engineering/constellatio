import { LinkButton } from "../../../components/atoms/LinkButton/LinkButton";
import CategoryTab from "../../../components/molecules/categoryTab/CategoryTab";
import FiltersButton from "../../../components/molecules/filtersButton/FiltersButton";
import FilterTag from "../../../components/molecules/filterTag/FilterTag";
import type { IGenCaisyDocument_Meta, IGenPageHeader_Categories, Maybe, Scalars } from "../../../services/graphql/__generated/sdk";

import { Title, useMantineTheme } from "@mantine/core";
import React, { type FunctionComponent, useState } from "react";

import * as styles from "./CasesOverviewHeader.styles";
import { Trash } from '@/components/Icons/Trash';

export interface ICasesOverviewHeaderProps {
  __typename?: 'PageHeader';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  categories?: Maybe<Array<Maybe<IGenPageHeader_Categories>>>;
  id?: Maybe<Scalars['ID']['output']>;
  internalTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  variant: "case" | "dictionary";
}

const OverviewHeader: FunctionComponent<ICasesOverviewHeaderProps> = ({ categories, title, variant }) => {
  const theme = useMantineTheme()
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const [filters, setFilters] = useState<string[]>(["Filter One", "Filter Two", "Filter Three", "Filter Four", "Filter Five", "Filter Six"]);
  // const [filters, setFilters] = useState<string[]>([]);
  return (
      <div css={styles.contentHeader({ theme, variant })} className="header">
        <div id="overlay" />
        <Title order={1}>{title}</Title>
        <div css={styles.categoriesButtons}>
          {categories?.map((category, index: number) => (
            <div key={index} onClick={() => setSelectedCategoryIndex(index)}>
              <CategoryTab {...category} itemsNumber={0} selected={index === selectedCategoryIndex} />
            </div>
          ))}
        </div>
        <div css={styles.filtersArea}>
          <FiltersButton title="Filters" />
          {/* this can be a helper or a provider with global state passed to the cases list for filters */}
          {filters.length > 0 && (
            <>
              <div css={styles.selectedFiltersArea}>
                {filters?.map((filter: string, index: number) => (
                  <div key={index} onClick={() => setFilters(filters.filter(x => x !== filter))}>
                    <FilterTag title={filter} />
                  </div>
                ))}
              </div>
              <LinkButton title={"Clear all filters"} icon={<Trash />} />
            </>
          )}
        </div>
      </div>
  );
};

export default OverviewHeader;
