const {
  getPackage,
  createPackage,
  updatePackage,
  deletePackage,
} = require("../model/Package");

const getDataPackage = async (req, res) => {
  try {
    const data = await getPackage();
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

const createDataPackage = async (req, res) => {
  try {
    const data = await createPackage(req.body);
    res.status(201).json({
      status: 201,
      message: "Berhasil Membuat Data",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi Error Ketika Menambahkan Data",
    });
  }
};

const updateDataPackage = async (req, res) => {
  try {
    const data = await updatePackage(req.body, req.params);
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
const deleteDataPackage = async (req, res) => {
  try {
    const data = await deletePackage(req.params);
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

module.exports = {
  getDataPackage,
  createDataPackage,
  updateDataPackage,
  deleteDataPackage,
};
