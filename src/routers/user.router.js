const express = require("express")
const router = express.Router()

router.all('/',(req,res,next)=>{
    
    // res.json({message:"returned from user router"})
    next()
})
router.post("/",(req,res)=>{
    console.log(req.body)
    res.json(req.body)
})

module.exports = router