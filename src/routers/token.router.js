const express = require('express')
const router = express.Router()
const {verifyRefreshJWT, createAccessJWT} = require('../helpers/jwt.helper')
const { getUserByEmail } = require('../models/user/User.model')


//return fresh refresh token
router.get('/', async(req,res,next)=>{
    const {authorization}= req.headers
    //1. make sure token valid
    const decodedJWT = await verifyRefreshJWT(authorization)
    console.log(decodedJWT)
    if(decodedJWT.email){
        //2. check if jwt exists in db
        const userProf = await getUserByEmail(decodedJWT.email)
       
        if(userProf._id){
            // res.json({message:userProf})
            let tokenExpiry = userProf.refreshJWT.addedAt
            const dbRefreshToken = userProf.refreshJWT.token
            tokenExpiry = tokenExpiry.setDate(tokenExpiry.getDate() + +process.env.JWT_REFRESH_EXPIRY)
           const today= new Date()
            //check if it is not expired
            if(tokenExpiry< today && dbRefreshToken !== authorization){
               return res.status(403).json({message:'refresh token expired'})

            }
            const accessJWT = await createAccessJWT(decodedJWT.email, userProf._id.toString() )

            //delete old token from redis

            return res.json(
                {
                    status:'success',
                    accessJWT
                }
            )
        }
    }
    
    //check if it is not expired
    res.status(403).json({message:'forbidden'})
})

module.exports= router