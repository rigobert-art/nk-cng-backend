"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const officerModel_1 = __importDefault(require("../model/officerModel"));
const jwtUtils_1 = require("../utils/jwtUtils");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        // Check if the user already exists
        const existingUser = yield officerModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const existingUsername = yield officerModel_1.default.findOne({ username });
        if (existingUsername) {
            return res.status(401).json({ message: 'Username already taken!' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new officerModel_1.default({ email, password: hashedPassword, username });
        yield newUser.save();
        res.status(201).json({ status: 200, message: 'User registered successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { auth, password } = req.body;
        // Find the user by email or username and select the password field
        const user = yield officerModel_1.default.findOne({
            $or: [{ email: auth }, { username: auth }]
        }).select('+password');
        // If no user is found, return an error
        if (!user) {
            return res.status(401).json({ status: 401, message: 'Invalid credentials' });
        }
        // Compare the provided password with the stored hashed password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: 401, message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, jwtUtils_1.JWT_SECRET, { expiresIn: '7d' });
        // Exclude the password from the user object before sending the response
        const _a = user.toObject(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
        res.json({ token, user: userWithoutPassword });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
});
exports.login = login;
