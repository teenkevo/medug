const {
  auth,
  claimCheck,
  InsufficientScopeError,
} = require("express-oauth2-jwt-bearer");
const dotenv = require("dotenv");

dotenv.config();

const validateAccessToken = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
});

const checkRequiredPermissions = (requiredPermissions) => {
  return (req, res, next) => {
    const permissionCheck = claimCheck((payload) => {
      let returnValue = true;
      const permissions = payload.permissions || [];

      const hasPermissions = permissions.filter((value) =>
        requiredPermissions.includes(value)
      );

      if (hasPermissions.length < 1) {
        returnValue = false;
        throw new InsufficientScopeError();
      }

      return returnValue;
    });

    permissionCheck(req, res, next);
  };
};

module.exports = {
  validateAccessToken,
  checkRequiredPermissions,
};
