import express, { Express } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";

// user grapql
import { resolvers } from "./resolver/index.resolver"; // resolvver

import { typeDefs } from "./typeDefs/index.typeDefs"; // import typDefs
import { requireAuth } from "./middleware/authen.middleware";

const startApolloServer = async () => {
  dotenv.config(); //dotenv

  const app: Express = express();
  const port: number | string = process.env.PORT;

  database.connect(); // connect to db

  app.use("/graphql", requireAuth);

  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: (req) => {
      return { ...req };
    },
  }); // init apolloServer

  await apolloServer.start(); // start server

  //set up API
  apolloServer.applyMiddleware({
    app: app,
    path: "/graphql",
  });

  app.listen(port, () => {
    console.log(`server is running at port ${port}`);
  });
};

startApolloServer();
