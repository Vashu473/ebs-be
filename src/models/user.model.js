const User = require("../db/schema/user.schema");
const constcUsDatabase = require("../db/schema/contactUs.schema");
const otpDatabase = require("../db/schema/otp.schema");
const { setToken } = require("../auth/jwt/jwt");
async function signupM(body) {
  try {
    const user = await User.create(body);

    return {
      message: "User created Successfully",
      success: true,
      token: null,
      data: user,
    };
  } catch (error) {
    let message = error.message;
    switch (error.code) {
      case 11000:
        message = "User already exists";
        break;
      default:
        break;
    }
    return { message: message, success: false, token: null };
  }
}
async function loginM(body) {
  try {
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (user) {
      if (password === user.password) {
        let token = await setToken(email);
        return { message: user, success: true, token: token };
      } else {
        return { message: "Invalid credentials", success: false, token: null };
      }
    } else {
      return { message: "No User Found", success: false, token: null };
    }
  } catch (error) {
    return { message: error.message, success: false, token: null };
  }
}
async function profileM(email) {
  try {
    const user = await User.findOne({ email });
    if (user) {
      return { message: user, success: true, token: null };
    } else {
      return { message: "No User Found", success: false, token: null };
    }
  } catch (error) {
    return { message: error.message, success: false, token: null };
  }
}
// will update this function
async function profileMP(email) {
  try {
    const user = await User.findOne({ email });
    if (user) {
      return { message: user, success: true, token: null };
    } else {
      return { message: "No User Found", success: false, token: null };
    }
  } catch (error) {
    return { message: error.message, success: false, token: null };
  }
}

// update user profile

async function profileUpdate(req) {
  try {
    const userProfileUpdate = {
      fname: req.body.fname,
      lname: req.body.lname,
      mobile: req.body.mobile,
    };
    const user = await User.findOneAndUpdate(
      { email: req?.email },
      userProfileUpdate,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    if (!user) {
      return { message: "user not updated", success: false, token: null };
    }

    return { message: user, success: true, token: null };
  } catch (error) {
    return { message: error.message, success: false, token: null };
  }
}

async function contactUs(req) {
  try {
    const { name, email, message } = req.body;
    const user = await constcUsDatabase.create({
      name,
      email,
      message,
    });
    return { message: user, success: true, token: null };
  } catch (error) {
    return { message: error.message, success: false, token: null };
  }
}

async function verifyEmail(req) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      let otpCode = Math.floor(1000 + Math.random() * 9000);

      let otpData = await otpDatabase.create({
        email: req.body.email,
        code: otpCode,
        expiresIn: new Date().getTime() + 300 * 1000,
      });
      return { message: otpData, success: true, token: null };
    }
    if (!user) {
      return { message: "Invalid Email", success: false, token: null };
    }
  } catch (error) {
    return { message: error.message, success: false, token: null };
  }
}

async function verifyOtp(req) {
  try {
    const otpVerfying = await otpDatabase.findOne({ code: req.body.code });

    if (!otpVerfying) {
      return { message: "Invalid Otp", success: false, token: null };
    }

    if (otpVerfying) {
      let currentTime = new Date().getTime();
      let diff = otpVerfying.expiresIn - currentTime;

      if (diff < 0) {
        return {
          message: "otp code is expired please try again",
          success: false,
          token: null,
        };
      }

      return { message: otpVerfying, success: true, token: null };
    }
  } catch (error) {
    return { message: error.message, success: false, token: null };
  }
}

async function forgotPassword(req) {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!user) {
      return {
        message: "Please verify your email first",
        success: false,
        token: null,
      };
    }

    if (user) {
      if (req.body.newPassword !== req.body.confirmPassword) {
        return {
          message: "password and confirmPassword are not matched",
          success: false,
          token: null,
        };
      }

      user.password = req.body.newPassword;
      user.save();
      return { message: user, success: true, token: null };
    } else {
      return { message: "internal server error", success: false, token: null };
    }
  } catch (error) {
    return { message: error.message, success: false, token: null };
  }
}

// // video post for user
// async function videoUpload(req) {
//   try {
//     const data = await videoDatabase.create({
//       title: req.body.title,
//       desc: req.body.desc,
//       video: req.file.filename,
//     });

//     if (!data) {
//       return { message: "internal server error", success: false };
//     }

//     return { message: data, success: true };
//   } catch (error) {
//     return { message: error.message, success: false, token: null };
//   }
// }

// get All video for Users

// async function allVideos() {
//   try {
//     const data = await videoDatabase.find({});

//     if (!data) {
//       return { message: "internal server error", success: false };
//     }

//     return { message: data, success: true };
//   } catch (error) {
//     return { message: error.message, success: false, token: null };
//   }
// }
module.exports = {
  signupM,
  loginM,
  profileM,
  profileMP,
  profileUpdate,
  verifyEmail,
  forgotPassword,
  // videoUpload,
  // allVideos,
  verifyOtp,
  contactUs,
};
