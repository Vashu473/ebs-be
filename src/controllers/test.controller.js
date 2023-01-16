// calling log function
const logs = require("../common/logs.common");
// calling logic function
const { testM} = require("../models/test.model");

// test get
async function testC(req, res) {
  const result = await testM(req.body);
  return res.json(result).status(200);
}
module.exports = {
    testC
};
