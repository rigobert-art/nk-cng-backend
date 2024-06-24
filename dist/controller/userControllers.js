"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleProfileImageUpload = exports.getUsers = exports.getUserById = exports.login = exports.resendOtp = exports.verify = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
const jwtUtils_1 = require("../utils/jwtUtils");
const africastalking_1 = __importDefault(require("africastalking"));
const africasTalking = (0, africastalking_1.default)({
    apiKey: "8ee049d80e558be1680fddf90fd4683e016d9ef98be04fbbc6e2e6f41f869cee",
    username: "MIKE001"
});
const sms = africasTalking.SMS;
// Utility function to generate OTP
const generateOTP = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
};
const sendOTP = async (phone, otp) => {
    const message = `Your verification code is ${otp}`;
    try {
        const response = await sms.send({
            to: phone,
            message: message,
            from: ''
        });
        console.log(response);
    }
    catch (error) {
        console.error('Error sending OTP:', error);
        throw error;
    }
};
const register = async (req, res) => {
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes
    try {
        const { name, password, phone } = req.body;
        // Check if the user already exists
        const existingUser = await userModel_1.default.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const existingPhone = await userModel_1.default.findOne({ phone });
        if (existingPhone) {
            return res.status(401).json({ message: "Phone Number already taken" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new userModel_1.default({ name, password: hashedPassword, phone, otp, otpExpiresAt });
        await newUser.save();
        await sendOTP(phone, otp);
        res.status(201).json({ status: 200, message: 'User registered successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.register = register;
const verify = async (req, res) => {
    const { phone, otp } = req.body;
    try {
        const user = await userModel_1.default.findOne({ phone, otp });
        if (!user) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
            return res.status(400).json({ message: 'OTP expired' });
        }
        user.account_verified = true;
        user.otp = undefined;
        user.otpExpiresAt = undefined;
        await user.save();
        res.status(200).json({ message: 'User verified successfully' });
    }
    catch (error) {
        console.error('Error verifying user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.verify = verify;
const resendOtp = async (req, res) => {
    const { phone } = req.body;
    if (!phone) {
        return res.status(400).json({ status: 'error', message: 'Phone number is required' });
    }
    try {
        const user = await userModel_1.default.findOne({ phone });
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes
        await user.save();
        // Send OTP via SMS
        const result = await sms.send({
            to: [phone],
            message: `Your OTP code is ${otp}`,
            from: ''
        });
        res.status(200).json({ status: 'success', message: 'OTP resent successfully', result });
    }
    catch (error) {
        console.error('Error resending OTP:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
exports.resendOtp = resendOtp;
const login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        // Find the user by email and select the password field
        const user = await userModel_1.default.findOne({ phone }).select('+password');
        // If no user is found, return an error
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, jwtUtils_1.JWT_SECRET, { expiresIn: '7d' });
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.json({ token, user: userWithoutPassword });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.login = login;
const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getUserById = getUserById;
const getUsers = async (req, res) => {
    try {
        const users = await userModel_1.default.find();
        res.status(200).json({ users });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error!" });
    }
};
exports.getUsers = getUsers;
const handleProfileImageUpload = async (req, res) => {
    try {
        const userId = req.params.userId;
        const imageUrl = req.body.imageUrl;
        // check if user exist 
        const user = userModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // save image to the database
        // user.profile_picture = imageUrl;
        // await user.save();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.handleProfileImageUpload = handleProfileImageUpload;
