const validateLoginInput = (req) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) return false;
  else return { username, password };
};

module.exports = { validateLoginInput };
