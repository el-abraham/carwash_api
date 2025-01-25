const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const RoleRouter = require("./routes/RoleRouter");
const UserRouter = require("./routes/userRouter");
const bookingRouter = require("./routes/bookingRouter");
const packageRouter = require("./routes/packageRouter");
const authRouter = require("./routes/authRouter");
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({
    status: 200,
    message: "Berhasil",
  });
});

app.use("/auth", authRouter);
app.use("/role", RoleRouter);
app.use("/user", UserRouter);
app.use("/booking", bookingRouter);
app.use("/package", packageRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("booking_update", (data) => {
    io.emit("update_bookings", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server Running At PORT : " + PORT);
});
