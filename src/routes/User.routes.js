const express = require("express");
const UserRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
const multer = require("multer")
// calling functions
const {
    signupC,loginC,profileC,updateProfileC,profileCP
} = require("../controllers/user.controller");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })
UserRouter.post("/signup",  signupC);
UserRouter.post("/login",  loginC);
UserRouter.put("/profile",upload.single("profile") ,getToken,  profileCP);
UserRouter.put("/updateProfile", getToken, updateProfileC);
UserRouter.get("/profile/:email", getToken, profileC);

module.exports = UserRouter;
