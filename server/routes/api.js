const express = require("express");
const {
  registerUser,
  validateLoginInput,
  isValidCredentials,
} = require("../util/auth.js");

const router = express.Router();

router.post("/register", async (req, res) => {
  const inputData = validateLoginInput(req);
  if (!inputData) return;

  const isValid = await registerUser(inputData);
  console.log(isValid);
  const resData = { status: isValid };
  res.status(isValid ? 200 : 403).send(resData);
});

router.post("/login", async (req, res) => {
  const inputData = validateLoginInput(req);
  if (!inputData) return;

  const isValid = await isValidCredentials(inputData);

  const resData = { token: isValid };

  res.status(isValid ? 200 : 403).send(resData);
});

module.exports = { router };
