// calling log function
const logs = require("../common/logs.common");
// calling logic function
const { getVideoM, postVideoM } = require("../models/video.model");

// test get
async function getVideoC(req, res) {
  const result = await getVideoM(req.body);
  return res.json(result).status(200);
}
async function postVideoC(req, res) {
  const result = await postVideoM(req.body);
  return res.json(result).status(200);
}
module.exports = {
  getVideoC,
  postVideoC,
};
