const express = require("express")
const router = express.Router()

router.all('/',(req,res,next)=>{
    console.log()
    res.json({message:"returned from category router"})
})

module.exports = router