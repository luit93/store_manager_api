const jwt = require("jsonwebtoken");
const {storeUserRefreshJWT} = require("../models/user/User.model")
const { setJWT, getJWT } = require("./redis.helper");


const createAccessJWT = async (email,_id) => {
  try {
    const accessToken = await jwt.sign({ email }, process.env.JWT_ACCESS_TK, {
      expiresIn: "15m",
    });
    await setJWT(accessToken,_id);
    return Promise.resolve(accessToken);
  } catch (error) {
    return Promise.reject(error);
  }
};
const createRefreshJWT = async (email,_id) => {
  try {
    const refreshToken = jwt.sign({ email }, process.env.JWT_REFRESH_TK, {
      expiresIn: "30d",
    });
    await storeUserRefreshJWT(_id,refreshToken)
    return Promise.resolve(refreshToken);
  } catch (error) {
    return Promise.reject(error);
  }
};
module.exports = { createAccessJWT, createRefreshJWT };
