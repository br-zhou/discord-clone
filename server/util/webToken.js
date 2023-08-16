const { sign, verify } = require("jsonwebtoken");

const KEY = "SECRET KEY"; // todo hide in .env

const createToken = (username) => {
  return sign({ username }, process.env.ACCESS_TOKEN_KEY);
};

const validateToken = (token) => {
  return verify(token, process.env.ACCESS_TOKEN_KEY);
};

module.exports = { createToken, validateToken };
