import CaseSolvingHeader from "@/components/organisms/caseSolvingHeader/CaseSolvingHeader";
import { Footer } from "@/components/organisms/Footer/Footer";
import { Header } from "@/components/organisms/Header/Header";
import { getCaseById } from "@/services/content/getCaseById";
import { type IGenCase } from "@/services/graphql/__generated/sdk";

import type { GetStaticProps, GetStaticPaths } from "next";
import { type FunctionComponent } from "react";

import * as styles from "../styles/styles";

interface ICasePageProps 
{
  readonly case: IGenCase;
//   readonly id: string | string[] | undefined;
}

export const getStaticProps: GetStaticProps = async ({ params }) => 
{
  console.log({ params });

  const id = Array.isArray(params?.id) ? (params?.id[0] ?? "") : (params?.id ?? "");
  const resCase = await getCaseById({ id });
  return {
    props: {
      case: resCase?.Case ?? null,
      id
    }
  };

};

const NextPage: FunctionComponent<ICasePageProps> = (props) => 
{

  console.log("resCase", props?.case?.title);
  return (
    <div css={styles.Page}>
      <Header/>
      {/* <h5>{props?.id}</h5> */}
      {props && props?.case && (
        <CaseSolvingHeader
          title={props?.case?.title ?? ""}
          variant="case"
          overviewCard={{
            lastUpdated: new Date(),
            legalArea: props?.case?.legalArea?.[0],
            status: "notStarted",
            tags: props?.case?.tags,
            timeInMinutes: props?.case?.durationToCompleteInMinutes || 0,
            topic: props?.case?.topic?.[0]?.topicName ?? "",
            variant: "case",
            views: 0,

          }}
        />
      )}
      <Footer/>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = () => 
{

  return {
    fallback: true,
    paths: []
  };
};

export default NextPage;
