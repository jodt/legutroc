const bcrypt = require('bcrypt');

async function checkUser(password, dbPwd) {
  try {
    return await bcrypt.compare(password, dbPwd);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { checkUser };
