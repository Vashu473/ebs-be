// calling log function
const logs = require("../common/logs.common");
const { sendEmail } = require("../helper/email.helper");
// calling logic function
const {
  signupM,
  loginM,
  profileMP,
  profileM,
  profileUpdate,
  verifyEmail,
  forgotPassword,
  verifyOtp,
  contactUs,
  sendEmailToAllM,
  attendenceM,
} = require("../models/user.model");

// User Signup`
async function signupC(req, res) {
  const result = await signupM(req.body);
  res.json(result).status(200);
  if (result.success) {
    sendEmail({
      email: req.body.email,
      subject: `Thank you for Enrollment`,
      message: `Your Registration Id : ${result["data"]["_id"]} . Thank you for joining us`,
    });
  }
  await logs(req.body, result, "signupC");
}
// Sent Email to All`
async function sendEmailToAllC(req, res) {
  const result = await sendEmailToAllM(req.body);
  res.json(result).status(200);
}
// User Login
async function loginC(req, res) {
  const result = await loginM(req.body);
  res.json(result).status(200);
  await logs(req.body, result, "loginC");
}
// User Profile Image
async function profileCP(req, res) {
  const result = await profileMP(req.body);
  res.json(result).status(200);
  await logs(req.body, result, "profileC");
}

// User  Profile
async function profileC(req, res) {
  console.log(req.email);
  const result = await profileM(req.email);
  res.json(result).status(200);
  await logs(req.body, result, "updateProfileC");
}

// User Update Profile
async function profileUpdatee(req, res) {
  // console.log(req.body);
  const result = await profileUpdate(req);
  res.json(result).status(200);
  await logs(req.body, result, "updateProfileC");
}

// user verify email
async function userVerifyEmail(req, res) {
  const result = await verifyEmail(req);

  res.json(result).status(200);
  if (result.success) {
    await sendEmail({
      email: req.body.email,
      subject: `Your verification otp is`,
      message: `Your otp is: ${result.message.code}, you can verify your otp`,
    });
  }
  await logs(req.body, result, "verifyEmail");
}

// user contact us
async function userContactus(req, res) {
  // console.log(req.body);
  const result = await contactUs(req);
  res.json(result).status(200);
  await logs(req.body, result, "contactus");
}
// user otp verify
async function userOtpVerify(req, res) {
  // console.log(req.body);
  const result = await verifyOtp(req);
  res.json(result).status(200);
  await logs(req.body, result, "verifyotp");
}

// user forgot password
async function userForgotPassword(req, res) {
  const result = await forgotPassword(req);
  res.json(result).status(200);
  await logs(req.body, result, "forgotPassword");
}

// attendence system for users
async function attendenceC(req, res) {
  const result = await attendenceM(req);
  res.json(result).status(200);
  await logs(req.body, result, "attendence");
}

// // videoUpload for user
// async function videoForUser(req, res) {
//   // console.log(req.body);
//   const result = await videoUpload(req);
//   res.json(result).status(200);
//   // await logs(req.body, result, "forgotPassword");
// }

// // All Videos for users
// async function allVideoForUser(req, res) {
//   // console.log(req.body);
//   const result = await allVideos();
//   res.json(result).status(200);
//   // await logs(req.body, result, "forgotPassword");
// }

module.exports = {
  signupC,
  loginC,
  profileCP,
  profileC,
  profileUpdatee,
  userVerifyEmail,
  userForgotPassword,
  // videoForUser,
  sendEmailToAllC,
  userOtpVerify,
  userContactus,
  attendenceC,
};
