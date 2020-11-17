import { buildSchema } from "type-graphql";
import { AuthorResolver } from "../resolvers/author";
import { BookResolver } from "../resolvers/book";

export const createSchema = () =>
  buildSchema({
    resolvers: [AuthorResolver, BookResolver],
    validate: false,
  });
