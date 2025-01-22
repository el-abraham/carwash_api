const express = require("express");
const notificationRouter = express.Router();
const {
  getDataNotif,
  createDataNotif,
  deleteDataNotif,
} = require("../controllers/NotificationController");
const authenticateToken = require("../middlewares/auth")

notificationRouter.get("/", authenticateToken, getDataNotif);
notificationRouter.post("/", authenticateToken, createDataNotif);
notificationRouter.delete("/:id", authenticateToken, deleteDataNotif);

module.exports = notificationRouter;
