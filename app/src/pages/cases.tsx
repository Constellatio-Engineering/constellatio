import CaseBlock from "@/components/organisms/caseBlock/CaseBlock";
import OverviewHeader from "@/components/organisms/casesOverviewHeader/CasesOverviewHeader";
import { Footer } from "@/components/organisms/Footer/Footer";
import { Header } from "@/components/organisms/Header/Header";
// import { AllCases } from "@/components/organisms/table/Table.stories";
import { getAllCases, type getAllCasesResult } from "@/services/content/getAllCases";
import { getAllCategories, type getAllCategoriesResult } from "@/services/content/getAllCategories";
import { getAllSubcategories } from "@/services/content/getAllSubcategories";
// import { type IGenMainCategoryFragment } from "@/services/graphql/__generated/sdk";

import { type GetStaticProps } from "next";
import React, { type FunctionComponent, useState, useEffect, ReactNode } from "react";

import * as styles from "./styles/styles";

type ICasesOverviewProps = getAllCasesResult & getAllCategoriesResult & getAllSubcategories;

export const getStaticProps: GetStaticProps<ICasesOverviewProps, Record<string, never>> = async () => 
{

  const [resAllCases, resAllCategories, resAllSubcategories] = await Promise.all([getAllCases(), getAllCategories(), getAllSubcategories()]);

  return {
    props: {
      Cases: resAllCases?.Cases ?? null,
      Categories: resAllCategories?.Categories ?? null,
      Subcategories: resAllSubcategories?.Subcategories ?? null,
    },
    revalidate: 1,
  };

};

const NextPage: FunctionComponent<ICasesOverviewProps> = ({ Cases, Categories, Subcategories }) => 
{
  const allCase = Cases?.allCase?.edges?.map((item) => (item?.node));
  const allCategory = Categories?.allMainCategory?.edges?.map((category) => (category?.node));
  const allSubcategory = Subcategories?.allSubCategory?.edges?.map((subcategory) => (subcategory?.node));
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(allCategory?.[0]?.id ?? "");
  const [filteredSubcategories, setFilteredSubcategories] = useState<(typeof allSubcategory) | undefined>(undefined);
  // const casesOfSelectedCategorySubcategories = allCase?.filter((caseItem) => caseItem?.subCategoryField?.some(e => e?.id === item?.id)));

  useEffect(() =>
  {
    setFilteredSubcategories(allSubcategory?.filter((item) => item?.mainCategory?.[0]?.id === selectedCategoryId));
    console.log({ filteredSubcategories });
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryId]);
  
  return (
    <div css={styles.Page}>
      <Header/>
      {/* {selectedCategoryId} */}
      {allCategory && (
        <OverviewHeader
          variant="case"
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          categories={allCategory}
          title="Cases"
        />
      )}
      <div css={styles?.ListWrapper}>
        {
          filteredSubcategories && filteredSubcategories.length > 0 && filteredSubcategories.map((item, itemIndex) => item?.subCategory && (
            <React.Fragment key={itemIndex}>
              <CaseBlock
                blockHead={{
                  blockType: "itemsBlock", categoryName: item?.subCategory, items: 4, variant: "case"
                }}
                cases={allCase?.filter((caseItem) => caseItem?.subCategoryField?.some(e => e?.id === item?.id))}
              />
              {/* {JSON.stringify(allCase?.filter((caseItem) => caseItem?.subCategoryField?.some(e => e?.id === item?.id)))} */}
            </React.Fragment>
          ))
        }
      </div>
      <Footer/>
    </div>
  );
};

export default NextPage;
