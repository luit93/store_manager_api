const express = require("express");
const router = express.Router();
const { insertUser } = require("../models/user/User.model");
const { hashPassword } = require("../helpers/bcrypt.helper");
router.all("/", (req, res, next) => {
  // res.json({message:"returned from user router"})
  next();
});
router.post("/", async (req, res) => {
  // console.log(req.body)
  const { name, email, phone, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const newUser = { name, email, phone, password: hashedPassword };
    const result = await insertUser(newUser);
    console.log(result);
    res.json({ message: "New user has been created", result });
  } catch (error) {
    res.json({ message: error.message, status: "error" });
  }
});

module.exports = router;
