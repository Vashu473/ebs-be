const User = require("../db/schema/user.schema");
const {setToken} = require("../auth/jwt/jwt");
const sendEmail = require("../auth/jwt/SendEmail");
async function signupM(body) {
  try {
 const user=  await User.create(body);
   console.log(body)
  return { message: "User created Successfully", success: true, token: null,data:user };

  } catch (error) {
    return { message: error.message, success: false, token: null };
  }
}
async function loginM(body) {
  try {
    const { email, password } = body;
    const user = await User.findOne({email});
    if (user) {
      if (password === user.password) {
     let token = await setToken(email)
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
module.exports = {
  signupM,
  loginM,
};
