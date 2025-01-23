const express = require("express");
const bookingRouter = express.Router();
const {
  getDataBooking,
  createDataBooking,
  updateDataStatus,
  deleteDataBooking,
} = require("../controllers/BookingController");
const authenticateToken = require("../middlewares/auth");

bookingRouter.get("/", authenticateToken, getDataBooking);
bookingRouter.post("/", authenticateToken, createDataBooking);
bookingRouter.put("/:id", authenticateToken, updateDataStatus);
bookingRouter.delete("/:id", authenticateToken, deleteDataBooking);

module.exports = bookingRouter;

