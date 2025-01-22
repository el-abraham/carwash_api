const { getNotif, createNotif, deleteNotif } = require("../model/Notification");

const getDataNotif = async (req, res) => {
  try {
    const data = await getNotif();
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

const createDataNotif = async (req, res) => {
  try {
    const data = await createNotif(req.body);
    res.status(200).json({
      message: "Berhasil Mendaftar webinar",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi Error Ketika Menambahkan Data",
    });
  }
};
const deleteDataNotif = async (req, res) => {
  try {
    const data = await deleteNotif(req.params);
    res.status(200).json({
      message: "Berhasil Menghapus Data",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi Error Ketika Mengupdate Data",
    });
  }
};

module.exports = {
  getDataNotif,
  createDataNotif,
  deleteDataNotif,
};
