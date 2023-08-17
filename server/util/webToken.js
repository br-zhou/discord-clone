const { sign, verify } = require("jsonwebtoken");

const createToken = (username) => {
  return sign({ username }, process.env.ACCESS_TOKEN_KEY);
};

const validateToken = (token) => {
  if (!token) return false;
  try {
    return verify(token, process.env.ACCESS_TOKEN_KEY);
  } catch {
    return false;
  }
};

const getTokenUsername = (token, id) => {
  const tokenData = validateToken(token);
  const username = tokenData.username || `Guest ${id.substring(0, 5)}`;
  return username;
};

module.exports = { createToken, validateToken, getTokenUsername };
