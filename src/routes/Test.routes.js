const express = require("express");
const TestRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
// calling functions
const {
  testC
} = require("../controllers/test.controller");

TestRouter.get("/",  testC);

module.exports = TestRouter;
