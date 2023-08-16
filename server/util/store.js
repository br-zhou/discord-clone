// temp solution. will implement db soon.
const { hash } = require("bcryptjs");

const SALT_ROUNDS = 7;
const ACCOUNTS = {};

const createAccount = async ({ username, password }) => {
  if (!ACCOUNTS[username]) {
    ACCOUNTS[username] = await hash(password, SALT_ROUNDS);
    return true;
  } else return false;
};

const getStoredPassword = async (username) => {
  return ACCOUNTS[username];
};

createAccount({ username: "brian", password: "zhou" });
module.exports = { getStoredPassword, createAccount };
