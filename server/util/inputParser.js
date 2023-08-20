const validateLoginInput = (req) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) return false;
  if (typeof username !== "string" || typeof password !== "string")
    return false;
  if (username.length > 25 || password.length > 25) return false;
  else return { username, password };
};

module.exports = { validateLoginInput };
