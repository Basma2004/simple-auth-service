const { findUser } = require("./users");

function login(username, password) {
  // Check if username and password are provided, are strings, and are not empty
  if (typeof username !== 'string' || username.trim() === '' || 
      typeof password !== 'string' || password.trim() === '') {
    return { success: false, message: "Invalid input: Username and password are required strings" };
  }
  const user = findUser(username);

  if (!user) {
    return { success: false, message: "User not found" };
  }

  if (user.password !== password) {
    return { success: false, message: "Invalid password" };
  }

  return {
    success: true,
    message: "Login successful",
    role: user.role
  };
}

module.exports = { login };
