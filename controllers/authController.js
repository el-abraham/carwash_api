const jwt = require("jsonwebtoken");
const { loginUser, createUser } = require("../model/User");

const login = async (req, res) => {
  try {
    const data = await loginUser(req.body);

    if (data.status === 401) {
      return res.status(401).json({ message: data.message });
    }

    return res.status(200).json({
      message: "Berhasil Login",
      token: data.token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi Error Ketika Login",
    });
  }
};
const register = async (req, res) => {
  try {
    const data = await createUser(req.body);
    if (data.status === 400) {
      return res.status(400).json({ message: data.message });
    }
    return res.status(200).json({
      message: "Berhasil Mendaftar",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi Error Ketika Menambahkan Data",
    });
  }
};

module.exports = { login, register };
