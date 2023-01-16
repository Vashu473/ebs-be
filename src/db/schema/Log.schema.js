const mongoose = require("mongoose");

const LogSchema = mongoose.Schema(
  {
    request: String,
    response: String,
    method: String,
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", LogSchema);

module.exports = Log;