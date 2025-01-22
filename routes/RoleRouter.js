const express = require("express");
const RoleRouter = express.Router();
const {
  getRole,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/RoleController");
const authenticateToken = require("../middlewares/auth");

RoleRouter.get("/", authenticateToken, getRole);
RoleRouter.post("/", authenticateToken, createRole);
RoleRouter.put("/:id", authenticateToken, updateRole);
RoleRouter.delete("/:id", authenticateToken, deleteRole);

module.exports = RoleRouter;
