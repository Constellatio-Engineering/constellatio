import { type GetStaticProps } from "next";
import { type FunctionComponent } from "react";

interface ICasePageProps 
{
  readonly id: string | string[] | undefined;
}

export const getStaticProps: GetStaticProps<ICasePageProps> = ({ params }) =>
{
  const id = params?.id;
  return {
    props: {
      id
    }
  };
    
};

const NextPage: FunctionComponent<ICasePageProps> = ({ id }) => 
{
  return (
    <div>{id}</div>
  );
};

export default NextPage;
