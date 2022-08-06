const Joi = require('joi')

const email = Joi.string()
.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','au'] } })  
const pin = Joi.string().min(6).max(6).required()

const newPassword = Joi.string().alphanum().min(8).max(20).required()
const shortStr = Joi.string().min(3).max(30).alphanum()
const longStr = Joi.string().min(10).max(100)

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

//server side validation for creating new cat
const newCategoryValidation=(req,res,next)=>{
    const schema = Joi.object({
        name:shortStr.required(),parent:shortStr.allow('').allow(null),img:Joi.any()
    })
    const value = schema.validate(req.body)
    console.log(value)
    if (value.error) {
        return res.json({
          status: 'error',
          message: value.error.message,
        })
      }
    next()
}
//server side validation for updating  cat
const updateCategoryValidation=(req,res,next)=>{
    const schema = Joi.object({
        name:shortStr.required(),parent:shortStr.allow('').allow(null),img:Joi.any()
    })
    const value = schema.validate(req.body)
    console.log(value)
    if (value.error) {
        return res.json({
          status: 'error',
          message: value.error.message,
        })
      }
    next()
}
module.exports={resetPinValidation,updatePasswordValidation,newCategoryValidation,updateCategoryValidation}