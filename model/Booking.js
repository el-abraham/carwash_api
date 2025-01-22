const carwash = require("../configuration/carwash");

const getBooking = async () => {
  try {
    const [results] = await carwash.query("SELECT * FROM `bookings`");
    return results;
  } catch (err) {
    console.log(err);
  }
};

const createBooking = async ({ user_id, package_id, date, status, queue }) => {
  const userID = parseInt(user_id);
  const packageID = parseInt(package_id);

  try {
    const sql =
      "INSERT INTO `bookings`( `user_id`, `package_id`, `date`, `status`, `queue`) VALUES (?, ?, ?, ?, ?)";

    const [result] = await carwash.query(sql, [
      userID,
      packageID,
      date,
      status,
      queue,
    ]);
    return result;
  } catch (err) {
    console.log(err);
  }
};
const updateStatus = async (body, params) => {
  try {
    const { id } = params;
    const { status } = body;
    const convID = parseInt(id);

    const updateQuery = "UPDATE `bookings` SET `status` = ? WHERE `id` = ? ";
    const [result] = await carwash.query(updateQuery, [status, convID]);

    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Terjadi kesalahan saat memperbarui data.");
  }
};

const deleteBooking = async (params) => {
  try {
    const { id } = params;
    const convID = parseInt(id); 

    const sql = 'DELETE FROM `bookings` WHERE `id` = "?"';
    const [result] = await carwash.query(sql, [convID])

    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Terjadi kesalahan saat memperbarui data.");
  }
};

module.exports = {
  getBooking,
  createBooking,
  updateStatus,
  deleteBooking
};
