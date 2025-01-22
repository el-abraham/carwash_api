const mysql = require("mysql2/promise");
require("dotenv").config()

const carwash = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

module.exports = carwash;
