const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../model/User");

const getDataUser = async (req, res) => {
  try {
    const data = await getUser();
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

const createDataUser = async (req, res) => {
  try {
    const data = await createUser(req.body);
    res.status(201).json({
      status: 201,
      message: "Berhasil Membuat User",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi Error Ketika Menambahkan Data",
    });
  }
};

const updateDataUser = async (req, res) => {
  try {
    const data = await updateUser(req.body, req.params);
    res.status(200).json({
      message: "Berhasil Mengupdate Data",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi Error Ketika Mengupdate Data",
    });
  }
};
const deleteDataUser = async (req, res) => {
  try {
    const data = await deleteUser(req.params);
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
  getDataUser,
  createDataUser,
  updateDataUser,
  deleteDataUser,
};
