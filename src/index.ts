import "reflect-metadata";
import express from "express";
import redis from 'redis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createAuthorLoader } from "./utils/dataloaders";

const main = async () => {
  await createConnection();

  const app = express();

  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient()

  app.use(
    session({
      name: 'qid',
      store: new RedisStore({
        client: redisClient,
        disableTouch: true
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 100, // 100 days
        httpOnly: true,
        sameSite: 'lax',
        secure: false // https only
      },
      saveUninitialized: false,
      secret: 'somesecretstring',
      resave: false,
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + '/resolvers/*.js'],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      authorLoader: createAuthorLoader()
    })
  });
  apolloServer.applyMiddleware({ app });

  app.listen(4444, () => {
    console.log("Server started on localhost:4444");
  });
};

main().catch((err) => {
  console.error(err);
});
