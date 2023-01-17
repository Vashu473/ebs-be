require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const socket = new Server(server);
const port = process.env.PORT;
const morgan = require("morgan");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");
const { startDb } = require("./src/db/connection/db.connection");
const body_parser = require("body-parser");
const { isMaster, fork } = require("cluster");
const { cpus } = require("os");
const cors = require("cors");
const startSocket = require("./src/web/socket");
const TestRouter = require("./src/routes/Test.routes");
const UserRouter = require("./src/routes/User.routes");
// adding middleware
// Body-parser middleware
app.use("/", express.static(path.join(__dirname, "./images")));
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("combined"))
app.use(
  cors({
    origin:process.env.COR,
    credentials: true,
  })
);
app.use(helmet());
// result of request validation
app.use((err, req, res, next) => {
  let message = err.message;
  if (isCelebrateError(err)) {
    console.log(err.details.get("body").message);
    if (err.details.get("body")) {
      message = err.details.get("body").message;
      return res.json({ success: false, message });
    }
    if (err.details.get("params")) {
      message = err.details.get("params").message;
      return res.json({ success: false, message });
    }
    if (err.details.get("query")) {
      message = err.details.get("query").message;
      return res.json({ success: false, message });
    }
  } else {
    next();
  }
});
// socket start
startSocket(socket);
// adding routing middle ware
app.use("/v1/test", TestRouter);
app.use("/v1/user", UserRouter);
// routing listening
async function startServer() {
  if (isMaster) {
    for (let i of cpus())  fork()
  } else {
    await startDb();
    server.listen(port, () =>console.log("Server running on port", port));
  }
}
startServer();