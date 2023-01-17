const mongoose = require("mongoose");

async function startDb() {
  mongoose
    .connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((data) => {
      console.log("database connected");
    })
    .catch((er) => {
      console.log("error while connecting database", er);
    });
}
async function stopDb() {
  mongoose.disconnect();
}

module.exports = {
  startDb,
  stopDb,
};
