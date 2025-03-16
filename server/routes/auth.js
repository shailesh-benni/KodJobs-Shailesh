const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper function to read users file
const readUsersFile = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { users: [], lastId: 0 };
  }
};

// Helper function to write to users file
const writeUsersFile = (data) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
};

router.post('/signup', (req, res) => {
  try {
    const { username, email, dateOfBirth, age, password } = req.body;
    const userData = readUsersFile();
    
    // Check if username or email already exists
    const userExists = userData.users.some(
      user => user.username === username || user.email === email
    );

    if (userExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username or email already exists' 
      });
    }

    // Generate new user ID
    const newId = (userData.lastId || 0) + 1;

    // Create new user object
    const newUser = {
      id: newId,
      username,
      email,
      dateOfBirth,
      age,
      password, // In production, make sure to hash the password
      createdAt: new Date().toISOString()
    };

    // Add user to array and update lastId
    userData.users.push(newUser);
    userData.lastId = newId;

    // Save to file
    writeUsersFile(userData);

    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error registering user' 
    });
  }
});

module.exports = router; 