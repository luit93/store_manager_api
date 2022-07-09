const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// defining user schema as a function
const UserSchema = new Schema({
  name: { type: String, maxLength: 50, required: true },
  email: { type: String, maxLength: 50, required: true },
  phone: { type: Number, maxLength: 11, required: false },
  password: { type: String, maxLength: 100, minLength: 8, required: true },
  refreshJWT: {
    token: { type: String, maxLength: 500, default: "" },
    addedAt: { type: Date, required: true, default: Date.now() },
  },
});

module.exports = {
  UserSchema: mongoose.model("User", UserSchema),
};
