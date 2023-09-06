import FloatingPanel from "@/components/floatingPanel/FloatingPanel";
import { Trash } from "@/components/Icons/Trash";
import CaseSolvingHeader from "@/components/organisms/caseSolvingHeader/CaseSolvingHeader";
import { Footer } from "@/components/organisms/Footer/Footer";
import { Header } from "@/components/organisms/Header/Header";
import { getCaseById } from "@/services/content/getCaseById";
import { type IGenCase } from "@/services/graphql/__generated/sdk";

import type { GetStaticProps, GetStaticPaths } from "next";
import { type FunctionComponent } from "react";

interface ICasePageProps 
{
  readonly case: IGenCase;
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
  const content = props?.case?.fullTextTasks?.json?.content?.filter((contentItem: { content: { text: string }[]; type: string }) => contentItem?.type === "heading");
  const facts = props?.case?.facts?.richTextContent;
  return (
    <div style={{ background: "#F6F6F5" }}>
      <Header/>
      {props && props?.case && (
        <CaseSolvingHeader
          title={props?.case?.title ?? ""}
          variant="case"
          overviewCard={{
            lastUpdated: new Date(),
            legalArea: props?.case?.legalArea,
            status: "notStarted",
            tags: props?.case?.tags,
            timeInMinutes: props?.case?.durationToCompleteInMinutes || 0,
            topic: props?.case?.topic?.[0]?.topicName ?? "",
            variant: "case",
            views: 0,

          }}
        />
      )}
      <FloatingPanel
        hidden={false}
        facts={facts}
        content={content}
        tabs={[{ icon: { src: <Trash/> }, title: "Content" }, { icon: { src: <Trash/> }, title: "Facts" }]}
      />
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
