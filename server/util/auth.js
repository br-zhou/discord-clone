const { compare, hash } = require("bcryptjs");
const { getPasswordHash, createUser } = require("./sqlDatabase");
const SALT_ROUNDS = 7;

const isValidCredentials = async ({ username, password }) => {
  const storedPassword = await getPasswordHash(username);
  if (!storedPassword) return false;
  return compare(password, storedPassword);
};

const registerUser = async ({ username, password }) => {
  const hashedPassword = await hash(password, SALT_ROUNDS);
  return createUser(username, hashedPassword);
};

module.exports = { registerUser, isValidCredentials };
