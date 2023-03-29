const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    src: {
      type: String,
    },
    course: [String],
    video: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("videoDatabase", videoSchema);
