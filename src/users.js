
const users = require("../data/users.json");

function findUser(username) {
  return users.find((u) => u.username === username);
}

module.exports = { findUser };