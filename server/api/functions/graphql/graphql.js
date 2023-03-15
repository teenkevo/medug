const cors = require("cors");
const express = require("express");
const compression = require("compression");
const { graphqlUploadExpress } = require("graphql-upload");
const { ApolloServer } = require("apollo-server-lambda");
const { Neo4jGraphQL } = require("@neo4j/graphql");
const { Neo4jGraphQLAuthJWKSPlugin } = require("@neo4j/graphql-plugin-auth");
const neo4j = require("neo4j-driver");
const typeDefs = require("./schema");
const resolvers = require("./resolvers/resolvers");

const driver = neo4j.driver(
  process.env.DOCKER_NEO4J_URI || process.env.NEO4J_URI,
  neo4j.auth.basic(
    process.env.DOCKER_NEO4J_USER || process.env.NEO4J_USER,
    process.env.DOCKER_NEO4J_PASSWORD || process.env.NEO4J_PASSWORD
  )
);

// TODO: Change roles path to medug's 
const neoSchema = new Neo4jGraphQL({
  typeDefs,
  resolvers,
  driver,
  plugins: {
    auth: new Neo4jGraphQLAuthJWKSPlugin({
      jwksEndpoint: "https://medug.us.auth0.com/.well-known/jwks.json",
      rolesPath: "https://medug\\.io/roles",
    }),
  },
});

exports.handler = async function (event, context, ...args) {
  const schema = await neoSchema.getSchema();

  const server = new ApolloServer({
    context: ({ event }) => ({ req: event }),
    introspection: true,
    schema,
  });

  const apolloHandler = server.createHandler({
    expressAppFromMiddleware(middleware) {
      const app = express();
      app.use(compression());
      app.use(cors());
      app.use(express.json({ limit: "50mb" }));
      app.use(express.urlencoded({ limit: "50mb", extended: true }));
      app.use(
        graphqlUploadExpress({
          maxFileSize: 100000000,
          maxFiles: 20,
        })
      );
      app.use(middleware);
      return app;
    },
    expressGetMiddlewareOptions: {
      cors: {
        origin: "*",
        credentials: false,
      },
      bodyParserConfig: { limit: "50mb" },
    },
  });

  return apolloHandler(
    {
      ...event,
      requestContext: context,
    },
    context,
    ...args
  );
};
