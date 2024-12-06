const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const { sequelizeInstance } = require("./models/sequelize");
const { resolvers } = require("./schema/resolvers.js");
const { typeDefs } = require("./schema/schemaGql.js");
const { jwt } = require("jsonwebtoken");
const { JWT_SECRET } = require("./schema/config.js");
const app = express();

sequelizeInstance
  .authenticate()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    //authorization headers for checking the decoding
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace("Bearer ", "");
      try {
        const { userId } = jwt.verify(token, JWT_SECRET);
        return { userId };
      } catch (error) {
        throw new Error("Invalid token");
      }
    }
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });
});
