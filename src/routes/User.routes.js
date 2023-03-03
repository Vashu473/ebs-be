const express = require("express");
const UserRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
const path = require("path");
const multer = require("multer");
// calling functions
const {
  signupC,
  loginC,
  profileC,
  profileCP,
  profileUpdatee,
  userVerifyEmail,
  userForgotPassword,
  // videoForUser,
  // allVideoForUser,
  userOtpVerify,
  userContactus,
} = require("../controllers/user.controller");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "/tmp/my-uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// const uploadVideo = multer({
//   limits: 1000000000000000 * 2000000000000000 * 5000000000000000,
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.resolve(__dirname, "../../videos"));
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + "_" + file.originalname);
//     },
//   }),
// });

// const upload = multer({ storage: storage });

UserRouter.post("/signup", signupC);
UserRouter.post("/login", loginC);
UserRouter.put("/profile", getToken, profileCP);
UserRouter.get("/profile", getToken, profileC);
UserRouter.put(
  "/updateProfile",

  getToken,
  profileUpdatee
);
UserRouter.post("/contactUs", userContactus);
UserRouter.post("/verifyEmail", userVerifyEmail);
UserRouter.post("/verify/otp", userOtpVerify);
UserRouter.post("/forgotPassword", userForgotPassword);
// UserRouter.post("/video/upload", uploadVideo.single("videos"), videoForUser);
// UserRouter.get("/allVideos", allVideoForUser);

module.exports = UserRouter;
