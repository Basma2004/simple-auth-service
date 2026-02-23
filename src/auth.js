const { findUser } = require("./users");

function login(username, password) {
  // Check if username and password are provided, are strings, and are not empty
  if (typeof username !== 'string' || username.trim() === '' || 
      typeof password !== 'string' || password.trim() === '') {
    return { success: false, message: "Invalid input: Username and password are required strings" };
  }
  // Reject login attempts if the password is shorter than 8 characters
  if (password.length < 8) {
    return { success: false, message: "Password must be at least 8 characters long" };
  }
  const user = findUser(username);

  if (!user) {
    return { success: false, message: "Invalid credentials" };
  }

  if (user.password !== password) {
    return { success: false, message: "Invalid credentials"};
  }

  return {
    success: true,
    message: "Login successful",
    role: user.role
  };
}

module.exports = { login };
