import { Layout } from "@/components/layouts/Layout";
import { postData } from "@/lib/post-data";

import { Button, Container, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Billing() 
{
  const router = useRouter();
  const [opening, setOpening] = useState(false);

  const redirectToCustomerPortal = async () => 
  {
    try 
    {
      setOpening(true);

      const { url } = await postData({
        url: "/api/stripe/portal",
      });
      router.push(url);
    }
    catch (error) 
    {
      if(error) { return alert((error as Error).message); }
    }
  };

  return (
    <Layout>
      <Container>
        <Title>Abonnement</Title>
        <Button mt="lg" loading={opening} onClick={redirectToCustomerPortal}>
          Stripe öffnen
        </Button>
      </Container>
    </Layout>
  );
}
