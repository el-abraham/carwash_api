const express = require("express");
const UserRouter = express.Router();
const {
  getDataUser,
  updateDataUser,
  deleteDataUser,
} = require("../controllers/UserController");
const authenticateToken = require("../middlewares/auth");

UserRouter.get("/", authenticateToken, getDataUser);
UserRouter.put("/:id", authenticateToken, updateDataUser);
UserRouter.delete("/:id", authenticateToken, deleteDataUser);

module.exports = UserRouter;
