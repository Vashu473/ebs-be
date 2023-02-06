const express=require("express")
const multer = require("multer")
const path=require("path")
const { registrationForm } = require("../controllers/registration.controllers")

const registrationRouter=express.Router()

const uploadImage = multer({
    limits: 1000000000 * 2000000,
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../images"));
      },
      fileFilter(file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|eps|raw|cr2|nef|orf|sr2|bmp|tif|tiff)$/)) {
            return cb(new Error('Please upload a valid image file'))
        }
        cb(undefined, true)
    },
      filename: function (req, file, cb) {
        cb(null,Date.now()+'_' +  file.originalname );
      },
  
    }),
  });


registrationRouter.post("/registration",uploadImage.single("avatar"),registrationForm)

module.exports=registrationRouter