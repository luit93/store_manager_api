const {verifyAccessJWT}= require("../helpers/jwt.helper")
const {getJWT} = require("../helpers/redis.helper")
const userAuthorization= async (req,res,next)=>{

    const {authorization}= req.headers
    console.log("authorizationmmmmmmmmmmm")
    console.log(authorization)
        //1. Validate JWT
        const decodedToken = await verifyAccessJWT(authorization)
        console.log("decodedTokenmmmmmmmmmmmmmm")
        console.log(decodedToken)
        console.log(decodedToken.email)
        if(decodedToken.email){
            const userId = await getJWT(authorization)
            console.log(userId)

            if(!userId){
               return res.status(403).json({message:'User Not Authorized'})
            }
            req.userId= userId
            return next()
        }
        return res.status(403).json({message:'User Not Authorized'})

        // res.send(decodedToken)
        //2. Check JWT in Redis
        //3. Extract user id
        //4. Get user profile from mongodb based on user id


    
   
    
}

module.exports= {userAuthorization}