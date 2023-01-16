const mongoose = require("mongoose");

async function startDb() {
  mongoose
    .connect("mongodb+srv://vashudev:vashudev143@cluster0.pizinn8.mongodb.net/chat?retryWrites=true&w=majority", {
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
