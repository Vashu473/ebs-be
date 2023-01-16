const mongoose = require("mongoose");

const UserSchema =new mongoose.Schema(
  {
    name:  {
      type:String,
      required:[true,"Please enter name"]
    },
    email: {
      type:String,
      required:[true,"Please enter email"],
      unique:true,
      index:true
    },
    password:  {
      type:String,
      required:[true,"Please enter password"]
    },
    interest: {
      type:Array,
    },
    img: {
      type:String,
    },
    mobile: {
      type:Number,
      minLength:10,
      maxLength:10
    },
    address: {
      type:String,
    },
    verified:{type:Boolean},
    active:{type:Boolean},
  },
  { timestamps: true }
);

const User =  mongoose.model("User", UserSchema);

module.exports = User;
