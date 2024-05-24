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
exports.getUserById = exports.personalDetails = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
const jwtUtils_1 = require("../utils/jwtUtils");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, phone } = req.body;
        // Check if the user already exists
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const existingPhone = yield userModel_1.default.findOne({ phone });
        if (existingPhone) {
            return res.status(401).json({ message: "Phone Number already taken" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new userModel_1.default({ email, password: hashedPassword, phone });
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
        const { email, password } = req.body;
        // Find the user by email and select the password field
        const user = yield userModel_1.default.findOne({ email }).select('+password');
        // If no user is found, return an error
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, jwtUtils_1.JWT_SECRET, { expiresIn: '7d' });
        const _a = user.toObject(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
        res.json({ token, user: userWithoutPassword });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.login = login;
const personalDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, first_name, last_name, phone, address, city, country, postal_code } = req.body;
        // Check if required fields are missing
        const missingFields = [];
        if (!first_name)
            missingFields.push('first_name');
        if (!last_name)
            missingFields.push('last_name');
        if (!phone)
            missingFields.push('phone');
        if (!address)
            missingFields.push('address');
        if (!city)
            missingFields.push('city');
        if (!country)
            missingFields.push('country');
        if (!postal_code)
            missingFields.push('postal_code');
        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
        }
        // if (!validatePhone(phone)) {
        //     return res.status(400).json({ message: 'Invalid phone number' });
        // }
        // if (!validatePostalCode(postal_code)) {
        //     return res.status(400).json({ message: 'Invalid postal code' });
        // }
        const user = yield userModel_1.default.findById(id);
        if (!user) {
            return res.status(401).json({ message: 'User does not exist' });
        }
        user.first_name = first_name;
        user.last_name = last_name;
        user.phone = phone;
        user.address = address;
        user.city = city;
        user.country = country;
        user.postal_code = postal_code;
        // Save the updated user
        yield user.save();
        res.status(200).json({ message: 'Personal details saved successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.personalDetails = personalDetails;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getUserById = getUserById;
