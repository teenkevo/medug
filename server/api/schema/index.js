const fs = require("fs");
const path = require("path");

const files = fs
  .readFileSync(
    process.env.GRAPHQL_SCHEMA || path.join(__dirname, "files.graphql")
  )
  .toString("utf-8");


const getPaymentMethods = fs
  .readFileSync(
    process.env.GRAPHQL_SCHEMA ||
      path.join(__dirname, "rest-getPaymentMethods.graphql")
  )
  .toString("utf-8");


const restUsers = fs
  .readFileSync(
    process.env.GRAPHQL_SCHEMA || path.join(__dirname, "rest-users.graphql")
  )
  .toString("utf-8");

const roles = fs
  .readFileSync(
    process.env.GRAPHQL_SCHEMA || path.join(__dirname, "rest-roles.graphql")
  )
  .toString("utf-8");

const stripe = fs
  .readFileSync(
    process.env.GRAPHQL_SCHEMA || path.join(__dirname, "rest-stripe.graphql")
  )
  .toString("utf-8");

const array = [
  files,
  getPaymentMethods,
  restUsers,
  roles,
  stripe,
];

module.exports = array.join(" ");
