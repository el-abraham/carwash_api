const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const RoleRouter = require("./routes/RoleRouter");
const UserRouter = require("./routes/userRouter");
const bookingRouter = require("./routes/bookingRouter");
const packageRouter = require("./routes/packageRouter");
const notificationRouter = require("./routes/notificationRouter");
const authRouter = require("./routes/authRouter")
require("dotenv").config()

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/role", RoleRouter);
app.use("/user", UserRouter);
app.use("/booking", bookingRouter);
app.use("/package", packageRouter);
app.use("/notification", notificationRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server Running At PORT : " + port);
});
