
const ApiError = require("../utils/apiError");

module.exports = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      if (!user) {
        return next(new ApiError("Unauthorized", 401));
      }

      const user_role = user.user_role;
      console.log("User Role:", role); // Debugging peran pengguna

      if (!allowedRoles.includes(role)) {
        return next(new ApiError("Your role does not have access permissions", 403));
      }

      next();
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  };
};
