//------------for connecting to the mongodb:
// const mongoose = require("mongoose");
// const connectDatabase = async () => {
//   try {
//     (await mongoose.connect("mongodb://127.0.0.1:27017")).then(() => {
//       console.log("Database Connnected");
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// module.exports = { connectDatabase };

//------------for creating models:

// const mongoose = require("mongoose");
// const signupSchema = new mongoose.Schema(
//     {
//         username: {type:String, required: true,trim:true},
//         email:{type:String, required: true, trim:true},
//         password:{type: String, required: true,trim: true},
//         contact : {type:Number, required:true},
//     },
//     {timestamps: true}
// );
//  const signupmodel= mongoose.model("Signupdata",signupSchema);
//  module.exports = signupmodel;

//-------------for generating Token:

// const jwt = require("jsonwebtoken");
// const generateToken = (userid) => {
//   try {
//     const token = jwt.sign({ id: userid }, "secretKey", { expiresIn: "24h" });
//     return token;
//   } catch (error) {
//     console.log(error);
//   }
// };
// module.exports = generateToken;

//---------------for verifying Token:

// const jwt = require("jsonwebtoken");
// const verifyToken = (token) => {
//     try {
//         const result = jwt.verify(token, "secretKey");
//         return result;
//     }catch(error){
//         console.log(error);
//     }
// };
// module.exports = verifyToken;

//----------------for encrypting and verifying password:

// const bcrypt = require("bcryptjs");
// const encryptPassword = async (originalpassword) => {
//   try {
//     let encryptedPassword = await bcrypt.hash(originalpassword, 10);
//     return encryptedPassword;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const verifyPassword = async (inputPassword, encryptedPassword) => {
//   try {
//     const checkPassword = await bcrypt.compare(
//       inputPassword,
//       encryptedPassword
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };
// module.exports = { encryptPassword, verifyPassword };
