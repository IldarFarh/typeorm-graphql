import { graphql, GraphQLSchema } from "graphql";
import { Maybe } from "type-graphql";
import { createSchema } from "../utils/createSchema";
import { createAuthorLoader } from "../utils/dataloaders";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}

let schema: GraphQLSchema;
export const graphqlCall = async ({ source, variableValues }: Options) => {
  if (!schema) {
    schema = await createSchema();
  }

  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      authorLoader: createAuthorLoader(),
    },
  });
};
