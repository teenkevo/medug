const { GraphQLUpload } = require("graphql-upload");
const { mutations: auth0Mutations, queries: auth0Queries } = require("./auth0");
const {
  mutations: stripeMutations,
  queries: stripeQueries,
} = require("./stripe");
const { mutations: filesMutations } = require("./files");

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    ...auth0Queries,
    ...stripeQueries,
  },

  Mutation: {
    ...auth0Mutations,
    ...stripeMutations,
    ...filesMutations,
  },
};

module.exports = resolvers;
