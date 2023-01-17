const User = require("../db/schema/user.schema");
const sendEmail = require("../helper/email.helper");

const dbStreams = async function (socket) {
  // creating streams
  const UserStream = User.watch([], {
    fullDocument: "updateLookup",
  });
//  catching changes 
  UserStream.on("change", async (next) => {
    if (next.operationType === "insert") {
     const count =  User.aggregate([{'$count': 'count'}]);
     await sendEmail({
      email: "av84770@gmail.com",
      subject: "Enrollment Count",
      message: `Total students enrolled : ${count}`,
    });
    }
  });
};
const startSocket = async function (socket) {
  socket.of("socket").on("connection", (socket) => {
    socket.on("receive", (data) => {
      console.log(data);
    });
  });
  setInterval(() => {
    socket.of("/socket").emit("send", "S");
  }, 1000);
  dbStreams(socket)
};
module.exports = startSocket;
