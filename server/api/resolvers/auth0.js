const {
  deleteUser,
  removeRolesFromUser,
  assignRolestoUser,
  createUser,
  importUsers,
  getAllRoles,
  getUserRoles,
  getUser,
} = require("./controllers/authentication/authenticationController");

const queries = {
  // auth0 - get all roles
  getAllRoles: () => getAllRoles(),
  // auth0 - get user's roles
  getUserRoles: (_, args) => {
    const { userId } = args;
    return getUserRoles(userId);
  },
  // auth0 - get user
  getUser: (_, args) => {
    const { userId } = args;
    return getUser(userId);
  },
};

const mutations = {
  // auth0 - delete user
  deleteUser: (_, args) => {
    const { id } = args;
    return deleteUser(id);
  },
  // auth0 - remove roles from user
  removeRolesFromUser: (_, args) => {
    const { roleIds, userId } = args;
    return removeRolesFromUser(roleIds, userId);
  },
  // auth0 - assign roles to user
  assignRolesToUser: (_, args) => {
    const { roleIds, userId } = args;
    return assignRolestoUser(roleIds, userId);
  },
  // auth0 - create user
  createUser: (_, args) => {
    const { email, password, connection } = args;
    return createUser(email, password, connection);
  },
  // // auth0 - bulk import
  createUserImport: (_, args) => {
    const { input } = args;
    return importUsers(input);
  },
};

module.exports = {
  queries,
  mutations,
};
