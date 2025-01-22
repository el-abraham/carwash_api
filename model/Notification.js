const carwash = require("../configuration/carwash");

const getNotif = async () => {
  try {
    const [results] = await carwash.query("SELECT * FROM `notifications`");
    return results;
  } catch (err) {
    console.log(err);
  }
};

const createNotif = async ({ user_id, booking_id, message }) => {
  const userID = parseInt(user_id);
  const bookingID = parseInt(booking_id);
  try {
    const sql =
      "INSERT INTO `packages`( `user_id`, `booking_id`, `message`) VALUES (?, ?, ?)";

    const [result] = await carwash.query(sql, [userID, bookingID, message]);
    return result;
  } catch (err) {
    console.log(err);
  }
};
const deleteNotif = async (params) => {
  try {
    const { id } = params;
    const convID = parseInt(id);

    const sql = 'DELETE FROM `notifications` WHERE `id` = "?"';
    const [result] = await carwash.query(sql, [convID]);

    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Terjadi kesalahan saat memperbarui data.");
  }
};

module.exports = {
  getNotif,
  createNotif,
  deleteNotif,
};
