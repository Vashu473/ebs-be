// calling log function
const logs = require("../common/logs.common");
// calling logic function
const { getVideoM, postVideoM } = require("../models/video.model");
const ApiFeatures = require("../utils/apiFeatures");
const VideoModel = require("../db/schema/video.schema");
// test get
async function getVideoC(req, res) {
  // console.log(req.body);
  let resultPerPage = 6;
  const apiFeatures = new ApiFeatures(
    VideoModel.find({}),
    req.query
  ).pagination(resultPerPage);
  const result = await apiFeatures.query;

  // const result = await getVideoM(req.body);
  return res
    .json({
      message: result,
      success: true,
      token: null,
    })
    .status(200);
}
async function postVideoC(req, res) {
  const result = await postVideoM(req.body);
  return res.json(result).status(200);
}
module.exports = {
  getVideoC,
  postVideoC,
};
