const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: process.env.SQL_DB_HOST,
    user: process.env.SQL_DB_USER,
    password: process.env.SQL_DB_PASSWORD,
    database: process.env.SQL_DB_DATABASE,
  })
  .promise();


const getPasswordHash = async (user) => {
  const [rows] = await pool.query(
    `SELECT password_hash FROM users WHERE username = ?;`,
    [user]
  );

  const result = (rows[0] && rows[0]["password_hash"]) || null;
  return result;
};

const createUser = async (username, passwordHash) => {
  try {
    const result = await pool.query(
      `INSERT INTO users (username, password_hash) VALUES (?, ?);`,
      [username, passwordHash]
    );

    return result;
  } catch (err) {
    return false;
  }
};

module.exports = { getPasswordHash, createUser };
