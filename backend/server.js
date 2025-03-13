const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;
const USERS_FILE = "./user.json";

app.use(cors());
app.use(bodyParser.json());

// Function to read users from file
const readUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Function to write users to file
const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
};

// Signup Route
app.post("/api/signup", (req, res) => {
  const { username, email, password } = req.body;
  let users = readUsers();

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists!" });
  }

  users.push({ username, email, password });
  writeUsers(users);
  res.status(201).json({ message: "User registered successfully!" });
});

// Login Route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  let users = readUsers();

  const user = users.find((user) => user.username === username && user.password === password);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  res.status(200).json({ message: "Login successful!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
