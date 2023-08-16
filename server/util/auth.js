const { compare } = require("bcryptjs");
const { createAccount, getStoredPassword } = require("./store");

const isValidCredentials = async ({ username, password }) => {
  const storedPassword = await getStoredPassword(username);
  if (!storedPassword) return false;
  return compare(password, storedPassword);
};

const validateLoginInput = (req) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) return false;
  else return { username, password };
};

const registerUser = async ({ username, password }) => {
  return createAccount({ username, password });
};

module.exports = { registerUser, validateLoginInput, isValidCredentials };
