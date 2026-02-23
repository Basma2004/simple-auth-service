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

 // Task 5: Audit Logging for "User not found"
  if (!user) {
    console.log(`[AUDIT] Failed login attempt: Username "${username}" not found at ${new Date().toISOString()}`);
    return { success: false, message: "User not found" };
  }

  // Task 5: Audit Logging for "Invalid password"
  if (user.password !== password) {
    console.log(`[AUDIT] Failed login attempt: Invalid password for user "${username}" at ${new Date().toISOString()}`);
    return { success: false, message: "Invalid password" };
  }
  return {
    success: true,
    message: "Login successful",
    role: user.role
  };
}

module.exports = { login };
