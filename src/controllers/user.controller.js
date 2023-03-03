// calling log function
const sendEmail = require("../helper/email.helper");
const logs = require("../common/logs.common");
// calling logic function
const {
  signupM,
  loginM,
  profileMP,
  profileM,
  profileUpdate,
  verifyEmail,
  forgotPassword,
  // videoUpload,
  // allVideos,
  verifyOtp,
  contactUs,
} = require("../models/user.model");

// User Signup`
async function signupC(req, res) {
  const result = await signupM(req.body);
  res.json(result).status(200);
  if (result.success) {
    await sendEmail({
      email: req.body.email,
      subject: `Thank you for Enrollment`,
      message: `Your Registration Id : ${result["data"]["_id"]} . We will notify you soon session date`,
    });
  }
  await logs({ ...req.ip, ...req.body }, result, "signupC");
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
  // console.log(req.body);
  const result = await forgotPassword(req);
  res.json(result).status(200);
  await logs(req.body, result, "forgotPassword");
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
  // allVideoForUser,
  userOtpVerify,
  userContactus,
};
