const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, "Please enter first name"],
    },
    lname: {
      type: String,
      required: [true, "Please enter last name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: [true, "Email already exists"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
    },
    course: {
      type: String,
    },
    img: {
      type: String,
      default: "No IMG",
    },
    mobile: {
      type: Number,
      minLength: 10,
      maxLength: 10,
      required: [true, "Please enter Mobile number"],
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    attendence: Number,
    verified: { type: Boolean, default: false },
    active: {
      type: Boolean,
      default: false,
    },
    block: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
