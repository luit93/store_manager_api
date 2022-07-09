const express = require("express");
const router = express.Router();
const { insertUser, getUserByEmail } = require("../models/user/User.model");
const { hashPassword, comparePassword } = require("../helpers/bcrypt.helper");
const {
  createAccessJWT,
  createRefreshJWT,
} = require("../helpers/jwt.helper");
const {userAuthorization} = require("../middleware/auth.middleware")

router.all("/", (req, res, next) => {
  // res.json({message:"returned from user router"})
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
router.get("/",userAuthorization,(req,res)=>{
  //data coming from db
  const user={
    name:"julius",
    email:"j@s.com",
    phone:"11111111111",
    password:"qqqqqqqq"
  }
  res.json({user: req.userId}) 
})
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
  const accessJWT = await createAccessJWT(user.email,`${user._id}`);
  const refreshJWT = await createRefreshJWT(user.email,`${user._id}`);
  // console.log('password compare',result)
  res.json({ status: "success", message: " successful",accessJWT,refreshJWT });
});


module.exports = router;
