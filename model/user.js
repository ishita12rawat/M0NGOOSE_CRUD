require("dotenv").config();
const mongoose = require('mongoose');
const { MONGO_URI } = require('../env');

// Define the schema for the user
const userSchema = mongoose.Schema({
  name: String,
  email: String,
});

// Connect to MongoDB
mongoose.connect(MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Define the User model
const User = mongoose.model('user', userSchema);

// Export the User model
module.exports = User;
