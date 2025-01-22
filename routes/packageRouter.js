const express = require("express");
const packageRouter = express.Router();
const {
  getDataPackage,
  createDataPackage,
  updateDataPackage,
  deleteDataPackage,
} = require("../controllers/PackageController");
const authenticateToken = require("../middlewares/auth");

packageRouter.get("/", authenticateToken, getDataPackage);
packageRouter.post("/", authenticateToken, createDataPackage);
packageRouter.put("/:id", authenticateToken, updateDataPackage);
packageRouter.delete("/:id", authenticateToken, deleteDataPackage);

module.exports = packageRouter;
