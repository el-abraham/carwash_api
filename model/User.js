const carwash = require("../configuration/carwash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUser = async () => {
  try {
    const [results] = await carwash.query(
      "SELECT `users`.`id`,`users`.`name`, `users`.`email`, `roles`.`role_name` FROM `users` JOIN `roles` on `roles`.`id` = `users`.`role_id` WHERE `users`.`role_id` = 1"
    );
    return results;
  } catch (err) {
    console.log(err);
  }
};

const createUser = async ({ name, email, password, role_id = 1 }) => {
  try {
    const sqlCheckEmail = "SELECT `email` FROM `users` WHERE `email` = ?";
    const [existingUser] = await carwash.query(sqlCheckEmail, [email]);

    if (existingUser.length > 0) {
      return { status: 400, message: "Email is already in use" };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sqlInsert =
      "INSERT INTO `users`(`name`, `email`, `password`, `role_id`) VALUES (?, ?, ?, ?)";
    const [result] = await carwash.query(sqlInsert, [
      name,
      email,
      hashedPassword,
      role_id,
    ]);

    return { status: 201, message: "User registered successfully" };
  } catch (err) {
    console.error(err);
    return { status: 500, message: "Internal Server Error" };
  }
};

const updateUser = async (body, params) => {
  try {
    const { id } = params;
    const { name, email, password, role_id } = body;
    const convID = parseInt(id);

    const fetchQuery = "SELECT * FROM `users` WHERE `id` = ?";
    const [response] = await carwash.query(fetchQuery, [convID]);

    if (!response) {
      throw new Error("Data dengan ID ini tidak ditemukan!");
    }

    const updatedName = name ?? response[0].name;
    const updatedEmail = email ?? response[0].email;
    const updatedPassword = password ?? response[0].password;
    const updatedRole = role_id ?? response[0].role_id;

    const updateQuery =
      "UPDATE `users` SET `name` = ?, `email` = ?, `password` = ?, `role_id` = ? WHERE `id` = ? ";
    const [result] = await carwash.query(updateQuery, [
      updatedName,
      updatedEmail,
      updatedPassword,
      updatedRole,
      convID,
    ]);

    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Terjadi kesalahan saat memperbarui data.");
  }
};
const deleteUser = async (params) => {
  try {
    const { id } = params;
    const convID = parseInt(id);

    const sql = 'DELETE FROM `users` WHERE `id` = "?"';
    const [result] = await carwash.query(sql, [convID]);

    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Terjadi kesalahan saat memperbarui data.");
  }
};
const loginUser = async ({ email, password }) => {
  try {
    const sql =
      "SELECT `id`, `email`, `password`, `role_id` FROM `users` WHERE `email` = ?";
    const [users] = await carwash.query(sql, [email]);

    if (users.length === 0) {
      return { status: 401, message: "Invalid email or password" };
    }

    const user = users[0];

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return { status: 401, message: "Invalid email or password" };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return { token, id: user.id, role: user.role_id };
  } catch (err) {
    console.error(err);
    return { message: "Internal Server Error" };
  }
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
