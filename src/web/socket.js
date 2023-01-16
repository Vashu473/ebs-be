const startSocket = async function (socket) {
  socket.of("socket").on("connection", (socket) => {
    socket.on("receive", (data) => {
      console.log(data);
    });
  });
  setInterval(() => {
    socket.of("/socket").emit("send", "S");
  }, 1000);
};
module.exports = startSocket;
