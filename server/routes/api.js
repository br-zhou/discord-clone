const express = require("express");
const { registerUser, isValidCredentials } = require("../util/auth.js");
const { validateLoginInput } = require("../util/inputParser.js");
const { createToken, validateToken } = require("../util/webToken.js");
const router = express.Router();

router.post("/register", async (req, res) => {
  const inputData = validateLoginInput(req);
  if (!inputData) return;

  const isValid = await registerUser(inputData);

  const resData = { token: isValid && createToken(inputData.username) };

  res.status(isValid ? 200 : 403).send(resData);
});

router.post("/login", async (req, res) => {
  const inputData = validateLoginInput(req);
  if (!inputData) return;

  const isValid = await isValidCredentials(inputData);

  const resData = { token: isValid && createToken(inputData.username) };
  res.status(isValid ? 200 : 403).send(resData);
});

module.exports = { router };
