import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
  console.log("New connecton created");
  socket.on("message", (msg) => {
    console.log("user fired message ");
    console.log(msg);
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
