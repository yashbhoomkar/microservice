const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');  // Add bcryptjs for password hashing

exports.register = async (req, res, next) => {
    console.log('Register function called');
    try {
        const { email, password } = req.body;

        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Store the plain-text password (NOT RECOMMENDED)
        const user = await User.create({ email, password });
        res.status(201).json({ token: generateToken(user._id) });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login function called with:', { email, password });

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        console.log('User found:', user);

        // Check if the user exists and the password matches
        if (!user || !(await bcrypt.compare(password, user.password))) {
            console.log('Invalid credentials');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate and return a token if credentials are valid
        res.json({ token: generateToken(user._id) });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
};
