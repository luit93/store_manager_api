const express = require("express")
const router = express.Router()
const {createCategory,getCategory} = require('../models/category/Category.model')
const {userAuthorization} = require('../middleware/auth.middleware')

router.all('/',(req,res,next)=>{
    next()
})
//create category
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
//get categories

router.get('/',userAuthorization,async(req,res,next)=>{
    try {
        
    const categories = await getCategory()
    res.json({
        status: 'success',
        message: 'list of categories',
        categories,
      })
    } catch (error) {
        console.log(error.message)

        res.status(500).json({
          status: 'error',
          message: 'error, unable to process your request, try again',
        })

    }
   
})



module.exports = router