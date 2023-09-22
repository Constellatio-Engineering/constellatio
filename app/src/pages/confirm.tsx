import { Layout } from "@/components/layouts/Layout";

import { type NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const Confirm: NextPage = () =>
{
  const router = useRouter();
  const urlSearchParams = new URLSearchParams(router.asPath.split("#")[1]);
  const params = Object.fromEntries(urlSearchParams.entries());

  console.log(params);

  return (
    <Layout>
      <div style={{ padding: 100 }}>
        <h1>Confirm Email Address</h1>
        <a href="">Confirm</a>
      </div>
    </Layout>
  );
};

export default Confirm;
