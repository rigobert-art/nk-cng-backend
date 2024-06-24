"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const officerModel_1 = __importDefault(require("../model/officerModel"));
const jwtUtils_1 = require("../utils/jwtUtils");
const register = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        // Check if the user already exists
        const existingUser = await officerModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const existingUsername = await officerModel_1.default.findOne({ username });
        if (existingUsername) {
            return res.status(401).json({ message: 'Username already taken!' });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new officerModel_1.default({ email, password: hashedPassword, username });
        await newUser.save();
        res.status(201).json({ status: 200, message: 'User registered successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { auth, password } = req.body;
        // Find the user by email or username and select the password field
        const user = await officerModel_1.default.findOne({
            $or: [{ email: auth }, { username: auth }]
        }).select('+password');
        // If no user is found, return an error
        if (!user) {
            return res.status(401).json({ status: 401, message: 'Invalid credentials' });
        }
        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: 401, message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, jwtUtils_1.JWT_SECRET, { expiresIn: '7d' });
        // Exclude the password from the user object before sending the response
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.json({ token, user: userWithoutPassword });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
};
exports.login = login;
