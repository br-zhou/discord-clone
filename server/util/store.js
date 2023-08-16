// temp solution. will implement db soon.

const ACCOUNTS = {};

const createAccount = async ({ username, hashedPassword }) => {
  if (!ACCOUNTS[username]) {
    ACCOUNTS[username] = hashedPassword;
    return true;
  } else return false;
};

const getStoredPassword = async (username) => {
  return ACCOUNTS[username];
};

module.exports = { getStoredPassword, createAccount };
