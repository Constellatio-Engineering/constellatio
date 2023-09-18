/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env.mjs";

import { print } from "graphql";
import { GraphQLError } from "graphql/index";
import { GraphQLClient } from "graphql-request";

import { getSdk as getSdkWithClient, type Requester } from "./__generated/sdk";

const requester: Requester<any> = async (doc: any, vars: any) =>
{
  if(!env.CAISY_PROJECT_ID || env.CAISY_PROJECT_ID === "")
  {
    throw new Error("CAISY_PROJECT_ID is not defined - please add it to the env file");
  }
  if(!env.CAISY_API_KEY || env.CAISY_API_KEY === "")
  {
    throw new Error("CAISY_API_KEY is not defined - please add it to the env file");
  }

  const client = new GraphQLClient(
    `https://cloud.caisy.io/api/v3/e/${env.CAISY_PROJECT_ID}/graphql`,
    {
      headers: {
        "x-caisy-apikey": `${env.CAISY_API_KEY}`
      },
    }
  );

  try 
  {
    const res = await client.rawRequest(print(doc), vars);
    return res?.data as any;
  }
  catch (err: unknown)
  {
    if(err instanceof GraphQLError && env.NEXT_PUBLIC_NODE_ENV === "development")
    {
      console.error(
        "Error in GraphQL request:",
        "\n" + print(doc) + "\n",
        vars,
        "\n" + err.message
      );
    }
    else 
    {
      console.error(err);
    }
  }
};

export const caisySDK = getSdkWithClient(requester);
