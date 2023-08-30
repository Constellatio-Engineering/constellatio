import { Layout } from "@/components/layouts/Layout";
import { postData } from "@/lib/post-data";

import { Button, Container, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { type FunctionComponent, useState } from "react";

const Billing: FunctionComponent = () =>
{
  const router = useRouter();
  const [opening, setOpening] = useState(false);

  const redirectToCustomerPortal = async (): Promise<void> =>
  {
    setOpening(true);

    let url: string;

    try
    {
      const postDataResult = await postData({
        url: "/api/stripe/portal",
      });

      if(!postDataResult.url)
      {
        throw new Error("No url returned from api/stripe/portal");
      }

      url = postDataResult.url;
    }
    catch (error)
    {
      console.error(error);
      return alert("An error occurred. Please look at the console for more details.");
    }

    void router.push(url);
  };

  return (
    <Layout>
      <Container>
        <Title>Abonnement</Title>
        <Button<"button"> mt="lg" loading={opening} onClick={redirectToCustomerPortal}>
          Stripe öffnen
        </Button>
      </Container>
    </Layout>
  );
};

export default Billing;
