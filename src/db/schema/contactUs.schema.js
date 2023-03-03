const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  message: {
    type: String,
  },
},{time});

module.exports = mongoose.model("constcUsDatabase", contactSchema);
