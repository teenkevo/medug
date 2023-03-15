const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const neo4j = require("neo4j-driver");
const { Neo4jGraphQL } = require("@neo4j/graphql");
const { Neo4jGraphQLAuthJWKSPlugin } = require("@neo4j/graphql-plugin-auth");
const dotenv = require("dotenv");
const typeDefs = require("./schema");
const resolvers = require("./resolvers/resolvers");
const { graphqlUploadExpress } = require("graphql-upload");
const compression = require("compression");
const cors = require("cors");
const Sentry = require("@sentry/node");

dotenv.config();

// TODO: Change sentry dsn to medug's 
Sentry.init({
  dsn: "https://4e373dcc26c945ff9b5191f27d57b394@o4504439295770624.ingest.sentry.io/4504673338261504",
  tracesSampleRate: 1.0,
});

async function startApolloServer() {
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

  const schema = await neoSchema.getSchema();

  const server = new ApolloServer({
    context: ({ req }) => ({ req }),
    schema,
    introspection: true,
  });

  await server.start();

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

  const port = process.env.GRAPHQL_SERVER_PORT || 5000;
  const path = process.env.GRAPHQL_SERVER_PATH || "/graphql";
  const host = process.env.GRAPHQL_SERVER_HOST || "127.0.0.1";

  server.applyMiddleware({ app, path });

  await new Promise((resolve) => app.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://${host}:${port}${server.graphqlPath}`);
  return { server, app };
}

startApolloServer();
