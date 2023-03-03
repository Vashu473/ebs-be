const express = require("express");
const VideoRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
// calling functions
const {
    getVideoC
} = require("../controllers/video.controller");

VideoRouter.get("/",  getVideoC);

module.exports = VideoRouter;
