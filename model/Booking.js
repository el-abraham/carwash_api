const carwash = require("../configuration/carwash");

const getBooking = async () => {
  try {
    const [results] = await carwash.query(
      "SELECT `bookings`.`id`,`bookings`.`date`, `bookings`.`time`, `bookings`.`status`, `bookings`.`package_id`, `packages`.`package_name`, `packages`.`price` FROM `bookings` JOIN `packages` ON `bookings`.`package_id` = `packages`.`id` ORDER BY `bookings`.`date` ASC, `bookings`.`time` ASC"
    );
    return results;
  } catch (err) {
    console.log(err);
  }
};

const getBookingId = async (params) => {
  const { id } = params;
  const convID = parseInt(id);
  try {
    const query =
      "SELECT `bookings`.`id`,`bookings`.`date`, `bookings`.`time`, `bookings`.`status`, `bookings`.`package_id`, `packages`.`package_name`, `packages`.`price` FROM `bookings` JOIN `packages` ON `bookings`.`package_id` = `packages`.`id` WHERE `bookings`.`user_id` = ? ORDER BY `bookings`.`date` ASC, `bookings`.`time` ASC";
    const [results] = await carwash.query(query, [convID]);
    return results;
  } catch (err) {
    console.log(err);
  }
};

const createBooking = async ({ user_id, package_id, date, time, status }) => {
  const userID = parseInt(user_id);
  const packageID = parseInt(package_id);

  try {
    const sql =
      "INSERT INTO `bookings`( `user_id`, `package_id`, `date`, `time`,`status`) VALUES (?, ?, ?,?, ?)";

    const [result] = await carwash.query(sql, [
      userID,
      packageID,
      date,
      time,
      status,
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
    const [result] = await carwash.query(sql, [convID]);

    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Terjadi kesalahan saat memperbarui data.");
  }
};

const getTime = async (query) => {
  try {
    const { date } = query;

    const times = [
      "09:00:00",
      "10:00:00",
      "11:00:00",
      "13:00:00",
      "14:00:00",
      "15:00:00",
    ];

    const sql = "SELECT * FROM `bookings` WHERE `date` = ?";
    const [result] = await carwash.query(sql, [date]);

    const booked = result.map((item) => item.time);
    const bookTime = times.filter((time) => !booked.includes(time));

    return bookTime;
  } catch (err) {
    console.error(err);
    throw new Error("Terjadi kesalahan saat memperbarui data.");
  }
};

module.exports = {
  getBooking,
  createBooking,
  updateStatus,
  deleteBooking,
  getTime,
  getBookingId,
};
