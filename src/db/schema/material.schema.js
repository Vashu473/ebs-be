const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
    number: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("material", materialSchema);
