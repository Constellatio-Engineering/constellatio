import { LinkButton } from "../../../components/atoms/LinkButton/LinkButton";
import CategoryTab from "../../../components/molecules/categoryTab/CategoryTab";
import FiltersButton from "../../../components/molecules/filtersButton/FiltersButton";
import FilterTag from "../../../components/molecules/filterTag/FilterTag";
import type { IGenCaisyDocument_Meta, IGenPageHeader_Categories, Maybe, Scalars } from "../../../services/graphql/__generated/sdk";

import { Title } from "@mantine/core";
import React, { type FunctionComponent, useState } from "react";

import * as styles from "./PageHeader.style";

interface IProp {
  __typename?: 'PageHeader';
  _meta?: Maybe<IGenCaisyDocument_Meta>;
  categories?: Maybe<Array<Maybe<IGenPageHeader_Categories>>>;
  id?: Maybe<Scalars['ID']['output']>;
  internalTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
}

const PageHeader: FunctionComponent<IProp> = ({ categories, title }) => 
{
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const [filters, setFilters] = useState<string[]>(["Filter One", "Filter Two", "Filter Three", "Filter Four", "Filter Five", "Filter Six", "Filter Seven", "Filter Eight", "Filter Nine", "Filter Ten", "Filter Eleven", "Filter Twelve", "Filter Thirteen", "Filter Fourteen", "Filter Fifteen", "Filter Sixteen", "Filter Seventeen", "Filter Eighteen", "Filter Nineteen", "Filter Twenty"]);
  // const [filters, setFilters] = useState<string[]>([]);
  return (
    <div>
      <div css={styles.contentHeader} className="header">
        <Title order={1}>{title}</Title>
        <div css={styles.categoriesButtons}>
          {categories?.map((category, index: number) => (
            <div key={index} onClick={() => setSelectedCategoryIndex(index)}>
              <CategoryTab {...category} itemsNumber={20} selected={index === selectedCategoryIndex}/>
            </div>
          ))}
        </div>
        <div css={styles.filtersArea}>
          <FiltersButton title="Filters"/>
          {/* this can be a helper or a provider with global state passed to the cases list for filters */}
          {filters.length > 0 && (
            <>
              <div css={styles.selectedFiltersArea}>
                {filters?.map((filter: string, index: number) => (
                  <div key={index} onClick={() => setFilters(filters.filter(x => x !== filter))}> 
                    <FilterTag title={filter}/>
                  </div>
                ))}
              </div>
              <LinkButton title={"Clear all filters"} icon={""}/>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default PageHeader;
