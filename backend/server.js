const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 5000;
const userFilePath = path.join(__dirname, "user.json");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Read users from file
const readUsers = () => {
  try {
    const data = fs.readFileSync(userFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is empty, return initial structure
    return {
      users: [],
      lastId: 0
    };
  }
};

// Write users to file
const writeUsers = (data) => {
  fs.writeFileSync(userFilePath, JSON.stringify(data, null, 2));
};

// Login Route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const userData = readUsers();
  
  const user = userData.users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    res.json({ success: true, message: "Login successful!" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials!" });
  }
});

// Signup Route
app.post("/api/signup", (req, res) => {
  const { username, email, dateOfBirth, age, password } = req.body;
  let userData = readUsers();

  // Check if user already exists
  const existingUser = userData.users.find(
    (user) => user.username === username || user.email === email
  );

  if (existingUser) {
    return res.status(400).json({ success: false, message: "User already exists!" });
  }

  // Create new user with incremented ID
  const newUser = {
    id: userData.lastId + 1,
    username,
    email,
    dateOfBirth,
    age,
    password,
    createdAt: new Date().toISOString()
  };

  // Update userData
  userData.users.push(newUser);
  userData.lastId = newUser.id;

  // Save to file
  writeUsers(userData);

  res.status(201).json({ success: true, message: "User registered successfully!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
