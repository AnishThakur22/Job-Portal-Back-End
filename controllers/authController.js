const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Generate JWT
function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });
}

exports.register = async (req, res) => {
    try {
        const { fullname, email, password, role } = req.body;

        // Validation
        if (!fullname || !email || !password) {
            return res.status(400).json({ success: false, message: 'Full name, email, and password are required' });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullname,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: role || "user"
        });

        await newUser.save();

        const token = generateToken(newUser._id);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
