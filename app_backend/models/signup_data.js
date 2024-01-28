const mongoose = require("mongoose");
const signupSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    password: { type: String, required: true, trim: true },
    dob: { type: String, required: true, trim: true },
    contact: { type: Number, required: true },
  },
  { timestamps: true }
);
const signupmodel = mongoose.model("SignUpData", signupSchema);
module.exports = signupmodel;
