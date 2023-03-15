require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const fs = require("fs");
const server = http.createServer(app);
// const { Server } = require("socket.io");
// const socket = new Server(server);
const port = process.env.PORT || 8000;
const morgan = require("morgan");
const helmet = require("helmet");
const { startDb } = require("./src/db/connection/db.connection");
const body_parser = require("body-parser");
const { isMaster, fork } = require("cluster");
const { cpus } = require("os");
const cors = require("cors");
const startSocket = require("./src/web/socket");
const TestRouter = require("./src/routes/Test.routes");
const UserRouter = require("./src/routes/User.routes");
const VideoRouter = require("./src/routes/Video.routes");
const User = require("./src/db/schema/user.schema");
// adding middleware
// Body-parser middleware

app.use("/", express.static(path.join(__dirname, "./images")));
app.use("/", express.static(path.join(__dirname, "./videos")));

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("combined"));
app.use(
  cors({
    origin: process.env.COR,
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
startSocket({});
// adding routing middle ware
app.use("/v1/test", TestRouter);
app.use("/v1/user", UserRouter);
app.use("/v1/video", VideoRouter);
// routing listening

// user model attendence code
setInterval(async () => {
  console.log("hello setInterval");
  await User.updateMany({ active: true }, { active: false });
}, 79200000);

async function startServer() {
  // if (isMaster) {
  //   for (let i of cpus()) fork();
  // } else {
  await startDb();
  server.listen(port, () => console.log("Server running on port", port));
  // }
}
startServer();
module.exports = app;
