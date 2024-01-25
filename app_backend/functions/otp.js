const TWILIO_SERVICE_ID = "VAb3ba88f2d161e0c46c38a78e1fdf0a27";
const TWILIO_ACCOUNT_ID = "ACf92fccba40cbdb88ded7a4a43e58b752";
const TWILIO_AUTH_TOKEN = "01e121112ce93249b42090157054a37a";

const client = require("twilio")(TWILIO_ACCOUNT_ID, TWILIO_AUTH_TOKEN);
const sendLoginOtp = (userphone) => {
  if (!userphone)
    return {
      success: false,
      error: "Contact number is missing",
    };

  client.verify
    .services(TWILIO_SERVICE_ID)
    .verifications.create({ to: userphone, channel: "sms" })
    .then((verifications) => {
      return { success: true, status: verifications.status };
    })
    .catch((err) => {
      console.log(err);
      if (err.code === 60200)
        return {
          success: false,
          error: "Invalid Parameter",
        };
      else if (err.code === 60203)
        return {
          success: false,
          error: "Max Send attempts reached",
        };
      else if (err.code === 60212)
        return {
          success: false,
          error: "Too many concurrent requests for phone number",
        };
      else
        return {
          success: false,
          error: "Server Issue, Try Again Later!",
        };
    });
};

const verifyOtp = async (contact, code) => {
  try {
    const verification_check = await client.verify
      .services(TWILIO_SERVICE_ID)
      .verificationChecks.create({ to: contact, code: code });
    console.log(verification_check.status);
    if (verification_check.status === "approved") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports = { sendLoginOtp, verifyOtp };
