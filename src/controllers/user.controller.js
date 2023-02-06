// calling log function
const sendEmail = require("../helper/email.helper");
const logs = require("../common/logs.common");
// calling logic function
const { signupM, loginM,updateProfileM,profileMP,profileM } = require("../models/user.model");

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
  await logs({...req.ip,...req.body}, result, "signupC");
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
// User Update Profile
async function updateProfileC(req, res) {
  const result = await updateProfileM(req.body);
  res.json(result).status(200);
  await logs(req.body, result, "updateProfileC");
}
// User  Profile
async function profileC(req, res) {
  const result = await profileM(req.params.email);
  res.json(result).status(200);
  await logs(req.body, result, "updateProfileC");
}
module.exports = {
  signupC,
  loginC,profileCP,updateProfileC,profileC
};
