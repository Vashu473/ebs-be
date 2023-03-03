const express = require("express");
const VideoRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
// calling functions
const { getVideoC, postVideoC } = require("../controllers/video.controller");

VideoRouter.get("/", getVideoC);
VideoRouter.post("/upload", postVideoC);

module.exports = VideoRouter;
