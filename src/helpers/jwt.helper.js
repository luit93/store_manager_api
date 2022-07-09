const jwt = require("jsonwebtoken");
// const { set } = require("mongoose");
const { setJWT, getJWT } = require("./redis.helper");


const createAccessJWT = async (payload) => {
  try {
    const accessToken = jwt.sign({ payload }, process.env.JWT_ACCESS_TK, {
      expiresIn: "15m",
    });
    await setJWT(accessToken);
    return Promise.resolve(accessToken);
  } catch (error) {
    return Promise.reject(error);
  }
};
const createRefreshJWT = async (payload) => {
  try {
    const refreshToken = jwt.sign({ payload }, process.env.JWT_REFRESH_TK, {
      expiresIn: "30d",
    });
    // await getJWT(refreshToken);
    return Promise.resolve(refreshToken);
  } catch (error) {
    return Promise.reject(error);
  }
};
module.exports = { createAccessJWT, createRefreshJWT };
