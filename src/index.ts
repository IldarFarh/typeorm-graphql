import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createAuthorLoader } from "./utils/dataloaders";
import {AuthorResolver} from './resolvers/author'
import {BookResolver} from './resolvers/book'

const main = async () => {
  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    database: "typeorm",
    synchronize: true,
    logging: false,
    entities: [__dirname + "/entities/*.js"],
  });

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthorResolver, BookResolver],
      validate: false,
    }),
    context: () => ({
      authorLoader: createAuthorLoader()
    })
  });
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
