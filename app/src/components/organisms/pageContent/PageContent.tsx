import React, { FunctionComponent, useState } from "react";

import * as styles from "./PageContent.style";
import { IGenPageContent } from "@/services/graphql/__generated/sdk";
import CategoryTab from "@/components/molecules/categoryTab/CategoryTab";
import { Title } from "@mantine/core";
import { FiltersIcon } from "@/components/Icons/filters";


const PageContent: FunctionComponent<IGenPageContent> = ({ title, categories, internalTitle }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0)
  return (
    <div >
      <div css={styles.contentHeader} className="header">
        <Title order={1}>{title}</Title>
        <div css={styles.categoriesButtons}>
          {categories?.map((category: any, index: number) => (
            <div key={index} onClick={() => setSelectedCategoryIndex(index)}>
              <CategoryTab {...category} itemsNumber={20} selected={index === selectedCategoryIndex} />
            </div>
          ))}
        </div>
        <div css={styles.filtersButton}>
         {<FiltersIcon/>} Filters
        </div>
      </div>

      <div className="list" css={styles.itemsList}>
        <div className="item">item</div>
        <div className="item">item</div>
        <div className="item">item</div>
      </div>
    </div>
  )
};

export default PageContent;
