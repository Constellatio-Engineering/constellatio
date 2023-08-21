/* eslint-disable import/no-unused-modules */
import { type CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env.local" });

export const config: CodegenConfig = {
  generates: {
    "src/services/graphql/__generated/graphql.schema.graphql": {
      plugins: ["schema-ast"],
    },
    "src/services/graphql/__generated/graphql.schema.json": {
      plugins: ["introspection"],
    },
    "src/services/graphql/__generated/sdk.ts": {
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
        "src/services/graphql/**/*.graphql",
        "src/services/graphql/fragments/**/*.ts",
        "src/services/graphql/queries/**/*.ts",
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
      [`https://cloud.caisy.io/api/v3/e/${process.env.CAISY_PROJECT_ID}/graphql` ||
      ""]: {
        headers: {
          "x-caisy-apikey": `${process.env.CAISY_API_KEY}`,
        },
      },
    },
  ],
};

export default config;
