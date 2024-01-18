import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import { OverlayLines } from "@/components/Icons/bg-layer";
import { Trash } from "@/components/Icons/Trash";
import { Layout } from "@/components/layouts/Layout";
import CategoryTab from "@/components/molecules/categoryTab/CategoryTab";
import FiltersButton from "@/components/molecules/filtersButton/FiltersButton";
import FilterTag from "@/components/molecules/filterTag/FilterTag";
import * as overviewHeaderStyles from "@/components/organisms/OverviewHeader/OverviewHeader.styles";
import PageHead from "@/components/organisms/pageHead/PageHead";
import { type NextPageWithLayout } from "@/pages/_app";

import { Title, useMantineTheme } from "@mantine/core";
import React from "react";

const Page: NextPageWithLayout = () =>
{
  const theme = useMantineTheme();
  const height = 500;
  const variant = "forum";

  return (
    <>
      <PageHead pageTitle="Forum"/>
      <div css={overviewHeaderStyles.contentHeader({ height, theme, variant })} className="header">
        <div id="overlay-lines">
          <OverlayLines/>
        </div>
        <Title order={1} css={overviewHeaderStyles.title({ theme, variant })}>Forum</Title>
      </div>
    </>
  );
};

Page.getLayout = Layout;

export default Page;
