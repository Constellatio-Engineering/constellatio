import { Layout } from "@/components/layouts/Layout";
import { api } from "@/utils/api";

import { Button, Container, Title } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import { type FunctionComponent, useState } from "react";

const Billing: FunctionComponent = () =>
{
  const router = useRouter();
  const { isLoading, mutateAsync: openStripePortal } = api.billing.openStripePortal.useMutation(); 

  const redirectToCustomerPortal = async (): Promise<void> =>
  {
    let url: string;

    try
    {
      const { stripeUrl } = await openStripePortal();
      url = stripeUrl;
    }
    catch (error)
    {
      console.error("error while getting stripe url", error);
      return;
    }

    void router.push(url);
  };

  return (
    <Layout>
      <Container>
        <Title>Abonnement</Title>
        <Button<"button"> mt="lg" loading={isLoading} onClick={redirectToCustomerPortal}>
          Stripe öffnen
        </Button>
      </Container>
    </Layout>
  );
};

export default Billing;
