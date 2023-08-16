const express = require("express");
const { checkCredentials } = require("../util/user-creds.js");

const router = express.Router();

router.get("/login", (req, res) => {
  const resData = { code: "bananas" };

  res.status(200).send(resData);
});

router.post("/new-user", (req, res) => {
  console.log(req.body);
  const data = { secret: "posted!" };
  res.status(200).send(data);
});

router.post("/user-login", (req, res) => {
  const isValid = checkCredentials(req.body);

  const resData = { token: isValid };

  res.status(isValid ? 200 : 403).send(resData);
});


module.exports = {router};
