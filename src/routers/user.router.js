const express = require("express");
const router = express.Router();
const {
  insertUser,
  getUserByEmail,
  getUserById,
} = require("../models/user/User.model");
const { hashPassword, comparePassword } = require("../helpers/bcrypt.helper");
const { createAccessJWT, createRefreshJWT } = require("../helpers/jwt.helper");
const { userAuthorization } = require("../middleware/auth.middleware");
const { setResetPin } = require("../models/reset-pin/ResetPin.model");
const { emailProcessor } = require("../helpers/email.helper");

router.all("/", (req, res, next) => {
  
  next();
});

//create new user route
router.post("/", async (req, res) => {
  console.log("req.body", req.body);

  const { name, email, phone, password } = req.body;

  try {
    //hashing password
    const hashedPassword = await hashPassword(password);
    console.log("hashedPassword", hashedPassword);
    const newUser = { name, email, phone, password: hashedPassword };
    console.log("newUser", newUser);
    const result = await insertUser(newUser);
    console.log("result", result);
    res.json({ message: "New user has been created", result });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});
//get user info route
router.get("/", userAuthorization, async (req, res) => {
  //3. Extract user id
  const _id = req.userId;
  //4. Get user profile from mongodb based on user id
  const userProfile = await getUserById(_id);

  res.json({ userProfile });
});
//user log in route
router.post("/login", async (req, res) => {
  console.log("data from client", req.body);
  const { email, password } = req.body;
  console.log(password);

  if (!email || !password) {
    return res.json({ status: "error", message: "invalid form submission" });
  }
  //get user with email from db
  const user = await getUserByEmail(email);
  // console.log('data from db',user);

  //hash password and compare with db

  const passFromDb = user && user._id ? user.password : null;
  if (!passFromDb)
    return res.json({ status: "error", message: "user not found" });
  // console.log("passfromDb",passFromDb)

  const passwordsMatch = await comparePassword(password, passFromDb); //true/false

  if (!passwordsMatch) {
    return res.json({
      status: "error",
      message: "passwords do not match ",
    });
  }
  //creating tokens
  const accessJWT = await createAccessJWT(user.email, `${user._id}`);
  const refreshJWT = await createRefreshJWT(user.email, `${user._id}`);
  // console.log('password compare',result)
  res.json({
    status: "success",
    message: " successful",
    accessJWT,
    refreshJWT,
  });
});
//reset password route
//A. create and send password reset pin



//save pin and email in db
//email the pin

//B. update pw in db
//receive email,pin and, new pw
//validate pin
//encrypt new pw
//update pw in db
//send email notification

//C. server sise form validation
//create middleware to validate data

router.post("/reset-password", async(req,res)=>{
  //receive email
  const {email} = req.body
  //check if user with email exists
  const user = await getUserByEmail(email)
  if(user && user._id){
    //create unique pin
    const setPin = await setResetPin(email)
    const result = await emailProcessor(email,setPin.pin)
    if(result && result.messageId){
      res.json({status:"success",message:"If the email exists in our database, the password reset pin will be sent soon "})

    }
    res.json({status:"error",message:"Unable to send rest pin, please try again later"})

    return res.json(result)
  }
  console.log(user)
  res.json({status:"error",message:"If the email exists in our database, the password reset pin will be sent soon "})

})
module.exports = router;
