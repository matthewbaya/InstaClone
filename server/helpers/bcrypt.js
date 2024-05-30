const { hashSync, compareSync } = require("bcryptjs");

function hashPassword(password) {
  return hashSync(password);
}

function comparePassword(password, passwordDb) {
  return compareSync(password, passwordDb);
}
module.exports = { hashPassword, comparePassword };
