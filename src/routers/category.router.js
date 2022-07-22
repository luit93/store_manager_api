const express = require("express")
const router = express.Router()
const {createCategory} = require('../models/category/Category.model')
const {userAuthorization} = require('../middleware/auth.middleware')

router.all('/',(req,res,next)=>{
    next()
})
router.post('/',userAuthorization,async(req,res,next)=>{
    try {
        //receive new category
    const {name} = req.body
    console.log('name',name)
    //insert category into mongodb
    const newCategory ={
        name
    }
    console.log('newCate',newCategory)
    const result = await createCategory(newCategory)
   console.log('result',result)
    if(result._id){
     return res.json({status:'success',message:"created new category "})
 
    }
      res.json({status:'error',message:"unable to create new category 1 "})
    } catch (error) {
        console.log(error)
        res.json({status:'error',message:"unable to create new category 2 "})

    }
   
})

module.exports = router