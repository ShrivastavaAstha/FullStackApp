const express = require("express");
const app = express();
app.use(express.json());
const cookies = require("cookie-parser");
app.use(cookies());
const { connectDatabase } = require("./connection/connect");
const signupmodel = require("./models/signup_data");
const verifyToken = require("./tokens/verifyToken");
const generateToken = require("./tokens/generateToken");
const { encryptPassword, verifyPassword } = require("./functions/encryption");
const { sendLoginOtp, verifyOtp } = require("./functions/otp");

const checkIfUserLoggedIn = (req, res, next) => {
  if (verifyToken(req.cookies.auth_tk)) {
    const userinfo = verifyToken(req.cookies.auth_tk);
    req.userid = userinfo.id;
    next();
  } else {
    return res.status(400).json({ success: false, error: "UNAUTHORIZED" });
  }
};

app.get("/public", checkIfUserLoggedIn, (req, res) => {
  try {
    return res.json({ success: true, message: "hello from the public api" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
});

app.post("/api/signup", async (req, res) => {
  try {
    const { email } = req.body;
    const userEmailExist = await signupmodel.findOne({ email });
    if (userEmailExist) {
      return res.json({ message: "Email already Exist" });
    }
    const obj = {
      username: req.body.username,
      email: req.body.email,
      password: await encryptPassword(req.body.password),
      contact: req.body.contact,
    };
    console.log(obj);
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
      const signupdata = new signupmodel(obj);
      await signupdata.save();
      return res.status(200).json({ success: true, message: "Data Saved" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email } = req.body;
    let inputpassword = req.body.password;
    const checkuser = await signupmodel.findOne({
      email: email,
    });

    if (!checkuser) {
      return res
        .status(400)
        .json({ success: false, error: "User not found, please signup first" });
    }
    let originalpassword = checkuser.password;

    if (await verifyPassword(inputpassword, originalpassword)) {
      sendLoginOtp(`+91${checkuser.contact}`);
      console.log(checkuser);
      return res.json({
        success: true,
        message: "Please enter OTP to login.",
      });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Incorrect password" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
app.post("/api/mfaverify", async (req, res) => {
  try {
    let email = req.body.email;
    let inputpassword = req.body.password;
    let code = req.body.code;
    const checkuser = await signupmodel.findOne({ email: email });
    if (!checkuser) {
      return res
        .status(400)
        .json({ success: false, error: "User not found, please signup first" });
    }
    let originalpassword = checkuser.password;

    if (
      (await verifyPassword(inputpassword, originalpassword)) &&
      (await verifyOtp(`+91${checkuser.contact}`, code))
    ) {
      const token = generateToken(checkuser._id);
      res.cookie("auth_tk", token);
      return res.json({ success: true, message: "Logged in successfully." });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});

app.get("/currentuser", checkIfUserLoggedIn, async (req, res) => {
  try {
    const userid = req.userid;
    const userdetails = await signupmodel.findOne(
      { _id: userid }
      // { email: 1, username: 1, contact: 1, cratedAt: 1 }
    );
    if (userdetails) {
      return res.json({ success: true, data: userdetails });
    } else {
      return res.status(400).json({ success: false, error: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});

app.get("/logout", (req, res) => {
  try {
    res.clearCookie("auth_tk");
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});
const PORT = 5000;
connectDatabase();
app.listen(PORT, async () => {
  await console.log(`Server is running at ${PORT}`);
});
