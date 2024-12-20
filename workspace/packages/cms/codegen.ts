/* eslint-disable import/no-unused-modules */
import { type CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

// eslint-disable-next-line import/no-named-as-default-member
dotenv.config({ path: __dirname + "/.env.local" });

export const config: CodegenConfig = {
  generates: {
    "src/graphql/__generated/graphql.schema.graphql": {
      plugins: ["schema-ast"],
    },
    "src/graphql/__generated/graphql.schema.json": {
      plugins: ["introspection"],
    },
    "src/graphql/__generated/sdk.ts": {
      config: {
        dedupeFragments: true,
        exportFragmentSpreadSubTypes: true,
        inlineFragmentTypes: "combine",
        preResolveTypes: true,
        rawRequest: false,
        skipTypename: false,
        typesPrefix: "IGen",
      },
      documents: [
        "src/graphql/**/*.graphql",
        "src/graphql/fragments/**/*.ts",
        "src/graphql/queries/**/*.ts",
      ],
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-generic-sdk",
      ],
    },
  },
  ignoreNoDocuments: true, 
  overwrite: true,
  schema: [
    {
      [`https://cloud.caisy.io/api/v3/e/${process.env.CAISY_PROJECT_ID}/graphql`]: {
        headers: {
          "x-caisy-apikey": `${process.env.CAISY_API_KEY}`,
        },
      },
    },
  ],
};

export default config;
