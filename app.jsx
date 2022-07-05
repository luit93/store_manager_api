const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const helmet = require("helmet")
const morgan = require("morgan")
const port = process.env.PORT || 3001
require('dotenv').config()
const mongoose = require('mongoose');

//connect to mongo db with mongoose
 mongoose.connect(process.env.MONGO_URL);

const app = express()
//Security
app.use(helmet())
//handle cors error
app.use(cors())
//logger
app.use(morgan("tiny"))
//set body parser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
//load routers
const userRouter = require("./src/routers/user.router")
const categoryRouter = require("./src/routers/category.router")

//use routers
app.use("/v1/user",userRouter)
app.use("/v1/category",categoryRouter)
app.listen(port,()=>{
    console.log(`API runnng on port http://localhost:${port}`)
})
//handle errors
const errorHandler = require("./src/utils/handleError")
app.use((req,res)=>{
    const error = new Error("resources not found")
    error.status = 404
    next(error)
    
}) 
app.use((error,req,res,next)=>{
    errorHandler(error,res)
})