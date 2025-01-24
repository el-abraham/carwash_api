const carwash = require("../configuration/carwash");

const getPackage = async () => {
  try {
    const [results] = await carwash.query("SELECT * FROM `packages`");
    return results;
  } catch (err) {
    console.log(err);
  }
};

const createPackage = async ({ package_name, price }) => {
  try {
    const sql =
      "INSERT INTO `packages`( `package_name`, `price`) VALUES (?, ?)";

    const [result] = await carwash.query(sql, [package_name, price]);
    return result;
  } catch (err) {
    console.log(err);
  }
};
const updatePackage = async (body, params) => {
  try {
    const { id } = params;
    const { package_name, price } = body;
    const convID = parseInt(id);

    const fetchQuery = "SELECT * FROM `packages` WHERE `id` = ?";
    const [response] = await carwash.query(fetchQuery, [convID]);

    if (!response) {
      throw new Error("Data dengan ID ini tidak ditemukan!");
    }

    const updatedPackage = package_name ?? response[0].package_name;
    const updatedPrice = price ?? response[0].price;

    const updateQuery =
      "UPDATE `packages` SET `package_name` = ?, `price` = ? WHERE `id` = ? ";
    const [result] = await carwash.query(updateQuery, [
      updatedPackage,
      updatedPrice,
      convID,
    ]);

    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Terjadi kesalahan saat memperbarui data.");
  }
};

const deletePackage = async (params) => {
  try {
    const { id } = params;
    const convID = parseInt(id);

    const sql = 'DELETE FROM `packages` WHERE `id` = "?"';
    const [result] = await carwash.query(sql, [convID]);

    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Terjadi kesalahan saat memperbarui data.");
  }
};

module.exports = {
  getPackage,
  createPackage,
  updatePackage,
  deletePackage,
};
