const { verifyAccessJWT } = require("../helpers/jwt.helper");
const { getJWT, deleteJWT } = require("../helpers/redis.helper");
//
const userAuthorization = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log("authorizationmmmmmmmmmmm");
  console.log(authorization);

  const decodedToken = await verifyAccessJWT(authorization); //1. Validate JWT
  console.log("decodedTokenmmmmmmmmmmmmmm");
  console.log(decodedToken);
  console.log(decodedToken.email);
  if (decodedToken.email) {
    const userId = await getJWT(authorization); //2. Check JWT in Redis
    console.log(userId);

    if (!userId) {
      return res.status(403).json({ message: "User Not Authorized" });
    }
    req.userId = userId;
    return next();
  }
  //if token not valid or expired- delete
  deleteJWT(authorization);

  return res.status(403).json({ message: "User Not Authorized" });
};

module.exports = { userAuthorization };
