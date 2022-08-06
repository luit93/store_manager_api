const jwt = require("jsonwebtoken");
const {storeUserRefreshJWT} = require("../models/user/User.model")
const { setJWT } = require("./redis.helper");


const createAccessJWT = async (email,_id) => {
  try {
    const accessToken = await jwt.sign({ email }, process.env.JWT_ACCESS_TK, {
      expiresIn: "1d",
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

const verifyAccessJWT= userJWT=>{
    try {
        return Promise.resolve(jwt.verify(userJWT,process.env.JWT_ACCESS_TK))
        
    } catch (error) {
        return Promise.resolve(error)
    }
}
const verifyRefreshJWT= userJWT=>{
    try {
        return Promise.resolve(jwt.verify(userJWT,process.env.JWT_REFRESH_TK))
        
    } catch (error) {
        return Promise.resolve(error)
    }
}
module.exports = { createAccessJWT, createRefreshJWT,verifyAccessJWT,verifyRefreshJWT };
