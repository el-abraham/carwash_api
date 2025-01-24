const {
  getBooking,
  createBooking,
  updateStatus,
  deleteBooking,
  getTime,
  getBookingId,
} = require("../model/Booking");

const getDataBooking = async (req, res) => {
  try {
    const data = await getBooking();
    res.status(200).json({
      status: 200,
      message: "Berhasil mendapat data",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi Error Ketika Mengambil Data",
    });
  }
};
const getDataBookingById = async (req, res) => {
  try {
    const data = await getBookingId(req.params);
    res.status(200).json({
      status: 200,
      message: "Berhasil mendapat data",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi Error Ketika Mengambil Data",
    });
  }
};

const createDataBooking = async (req, res) => {
  try {
    const data = await createBooking(req.body);
    res.status(200).json({
      status: 201,
      message: "Berhasil Melakukan Booking",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi Error Ketika Menambahkan Data",
    });
  }
};

const updateDataStatus = async (req, res) => {
  try {
    const data = await updateStatus(req.body, req.params);
    res.status(200).json({
      status: 200,
      message: "Berhasil Mengupdate Data",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi Error Ketika Mengupdate Data",
    });
  }
};
const deleteDataBooking = async (req, res) => {
  try {
    const data = await deleteBooking(req.params);
    res.status(200).json({
      status: 200,
      message: "Berhasil Menghapus Data",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi Error Ketika Mengupdate Data",
    });
  }
};

const getDataTime = async (req, res) => {
  try {
    const data = await getTime(req.query);
    res.status(200).json({
      message: "Berhasil mendapat data",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi Error Ketika Mengambil Data",
    });
  }
};

module.exports = {
  getDataBooking,
  createDataBooking,
  updateDataStatus,
  deleteDataBooking,
  getDataTime,
  getDataBookingById,
};
