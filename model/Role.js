const carwash = require("../configuration/carwash");

const getData = async () => {
  try {
    const [results] = await carwash.query("SELECT * FROM `roles`");
    return results;
  } catch (err) {
    console.log(err);
  }
};

const createData = async ({ role_name }) => {
  try {
    const sql =
      "INSERT INTO `roles`(`role_name`) VALUES (?)";

    const [result] = await carwash.query(sql, [role_name]);
    return result;
  } catch (err) {
    console.log(err);
  }
};
const updateData = async (body, params) => {
  try {
    const { id } = params;
    const { role_name } = body;
    const convID = parseInt(id);

    const fetchQuery = "SELECT * FROM `roles` WHERE `id` = ?";
    const [response] = await carwash.query(fetchQuery, [convID]);

    if (!response) {
      throw new Error("Data dengan ID ini tidak ditemukan!");
    }

    const updatedRole = role_name ?? response[0].role_name;

    const updateQuery =
      "UPDATE `roles` SET `role_name` = ? WHERE `id` = ? ";
    const [result] = await carwash.query(updateQuery, [
      updatedRole,
      convID,
    ]);

    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Terjadi kesalahan saat memperbarui data.");
  }
};
const deleteData = async (params) => {
  try {
    const { id } = params;
    const convID = parseInt(id); 

    const sql = 'DELETE FROM `roles` WHERE `id` = "?"';
    const [result] = await carwash.query(sql, [convID])

    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Terjadi kesalahan saat memperbarui data.");
  }
};

module.exports = {
  getData,
  createData,
  updateData,
  deleteData,
};
