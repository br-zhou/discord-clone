const { compare, hash } = require("bcryptjs");
const { createAccount, getStoredPassword } = require("./store");
const SALT_ROUNDS = 7;

const isValidCredentials = async ({ username, password }) => {
  const storedPassword = await getStoredPassword(username);
  if (!storedPassword) return false;
  return compare(password, storedPassword);
};

const registerUser = async ({ username, password }) => {
  const hashedPassword = await hash(password, SALT_ROUNDS);
  return createAccount({ username, hashedPassword });
};

registerUser({ username: "brian", password: "zhou" });

module.exports = { registerUser, isValidCredentials };
