const { ManagementClient } = require("auth0");
const dotenv = require("dotenv");
dotenv.config();

// Set up Auth0 configuration
const authConfig = {
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  audience: process.env.AUTH0_MANAGEMENT_API_AUDIENCE,
};

// Create a new instance of the ManagementClient
const managementAPI = new ManagementClient({
  domain: authConfig.domain,
  clientId: authConfig.clientId,
  clientSecret: authConfig.clientSecret,
  audience: authConfig.audience,
});

//create users logic
const createUser = async (email, password, connection) => {
  return managementAPI
    .getUsersByEmail(email)
    .then(function (users) {
      // go ahead and create a new user if the user
      // with the specified email doesnt exist
      if (users.length === 0) {
        return (
          managementAPI
            .createUser({
              connection,
              email,
              password,
            })
            .then((user) => ({
              user,
              message: "user does not exist",
            }))
            // TODO: Work on sending the request errors to the client
            .catch(function (err) {
              console.log(err);
            })
        );
      } else if (users.length > 0) {
        return {
          user: users[0],
          message: "user exists",
        };
      }
    })
    .catch(function (err) {
      console.log(err);
    });
};

//import users logic
const importUsers = async (userJsonArray) => {
  return managementAPI
    .importUsersJob({
      connection_id: "con_N2306M0sSIkKV0zU",
      users_json: JSON.stringify(userJsonArray),
    })
    .then((result) => result)
    .catch((err) => console.log(err));
};

// get specific user
const getUser = async (userId) => {
  return managementAPI
    .getUser({ id: userId })
    .then((user) => user)
    .catch((err) => console.log(err));
};

// get all roles
const getAllRoles = async () => {
  return managementAPI
    .getRoles()
    .then((roles) => roles)
    .catch((err) => console.log(err));
};

// get a users role (a user has one role for this app)
const getUserRoles = async (userId) => {
  return managementAPI
    .getUserRoles({ id: userId })
    .then((roles) => roles)
    .catch((err) => console.log(err));
};

// assign a role to a user
const assignRolestoUser = async (roleIds, userId) => {
  const params = { id: userId };
  const data = { roles: [...roleIds] };
  return managementAPI
    .assignRolestoUser(params, data)
    .then(() => "roles assigned")
    .catch((err) => console.log(err));
};

// remove a role from a user
const removeRolesFromUser = async (roleIds, userId) => {
  const params = { id: userId };
  const data = { roles: [...roleIds] };
  try {
    await managementAPI.removeRolesFromUser(params, data);
    return "roles removed";
  } catch (err) {
    return console.log(err);
  }
};

// delete a user
const deleteUser = async (id) => {
  return managementAPI
    .deleteUser({ id })
    .then((response) => {
      return `user - ${id} deleted`;
    })
    .catch((err) => console.log(err));
};

module.exports = {
  createUser,
  importUsers,
  getUser,
  getAllRoles,
  getUserRoles,
  assignRolestoUser,
  removeRolesFromUser,
  deleteUser,
};
