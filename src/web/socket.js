const User = require("../db/schema/user.schema");
const { sendEmail } = require("../helper/email.helper");

const dbStreams = async function () {
  // creating streams
  const UserStream = User.watch([], {
    fullDocument: "updateLookup",
  });
  //  catching changes
  UserStream.on("change", async (next) => {
    if (next.operationType === "insert") {
      const count = await User.aggregate([{ $count: "count" }]);
      await sendEmail({
        email: "av84770@gmail.com",
        subject: "Enrollment Count",
        message: `Total students enrolled : ${count[0].count}`,
      });
    }
  });
};
const array = [];
const startSocket = async function (socket) {
  socket.of("socket").on("connection", (io) => {
    array.push(io?.id);
    socket.of("socket").emit("receive", array.length);
    io.on("disconnect", () => {
      let id = array.indexOf(io?.id);
      array.splice(id, 1);
      socket.of("socket").emit("receive", array.length);
    });
  });

  dbStreams();
};
module.exports = startSocket;
