const jwt = require('jsonwebtoken')

const createAccessJWT=(payload)=>{
    const accessToken = jwt.sign({payload},process.env.JWT_ACCESS_TK,{expiresIn:'30d'})
    return Promise.resolve(accessToken)

}
const createRefreshJWT=(payload)=>{
    const refreshToken = jwt.sign({payload},process.env.JWT_REFRESH_TK,{expiresIn:'15m'})
    return Promise.resolve(refreshToken)

}
module.exports= {createAccessJWT,createRefreshJWT}