const Log = require("../db/schema/Log.schema.js");

// saving logs
async function logs(data1, data2, data3) {
  const logData = {
    request: JSON.stringify(data1),
    response: JSON.stringify(data2),
    method: data3,
  };
  const logStore = await Log(logData);
  await logStore.save();
}
module.exports = logs;
