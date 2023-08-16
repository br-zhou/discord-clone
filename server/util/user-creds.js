const ACCOUNTS = {
  brian: "zhou",
};

const checkCredentials = ({ username, password }) => {
  if (!(typeof username === "string" && typeof password === "string"))
    return false;
  if (ACCOUNTS[username] === password) return true;
  return false;
};

const createAccount = ({ username, password }) => {
  if (!ACCOUNTS[username]) ACCOUNTS[username] = password;
};

module.exports = { checkCredentials, createAccount };
