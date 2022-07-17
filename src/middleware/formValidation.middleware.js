const Joi = require('joi')

const email = Joi.string()
.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','au'] } })  
const pin = Joi.string().min(6).max(6).required()

const newPassword = Joi.string().alphanum().min(8).max(20).required()

const resetPinValidation=(req,res,next)=>{
    const schema = Joi.object({email})
    const value = schema.validate(req.body)
    if(value.error){
        return res.json({status:'error',message:value.error.message})
    }
    next()
}
const updatePasswordValidation=(req,res,next)=>{
    const schema = Joi.object({email,pin,newPassword})
    const value = schema.validate(req.body)
    if(value.error){
        return res.json({status:'error',message:value.error.message})
    }
    next()
}

module.exports={resetPinValidation,updatePasswordValidation}