const { getData, createData, updateData, deleteData } = require("../model/Role");

const getRole = async (req, res) => {
  try {
    const data = await getData();
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

const createRole = async (req, res) => {
  try {
    const data = await createData(req.body);
    res.status(200).json({
      message: "Berhasil Membuat Data",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi Error Ketika Menambahkan Data",
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const data = await updateData(req.body, req.params)
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
const deleteRole = async (req, res) => {
  try {
    const data = await deleteData(req.params)
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
  getRole,
  createRole,
  updateRole,
  deleteRole
};
