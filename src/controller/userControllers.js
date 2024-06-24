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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.handleProfileImageUpload = exports.getUsers = exports.getUserById = exports.login = exports.resendOtp = exports.verify = exports.register = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var userModel_1 = __importDefault(require("../model/userModel"));
var jwtUtils_1 = require("../utils/jwtUtils");
var africastalking_1 = __importDefault(require("africastalking"));
var africasTalking = (0, africastalking_1.default)({
    apiKey: "8ee049d80e558be1680fddf90fd4683e016d9ef98be04fbbc6e2e6f41f869cee",
    username: "MIKE001"
});
var sms = africasTalking.SMS;
// Utility function to generate OTP
var generateOTP = function () {
    return Math.floor(10000 + Math.random() * 90000).toString();
};
var sendOTP = function (phone, otp) { return __awaiter(void 0, void 0, void 0, function () {
    var message, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                message = "Your verification code is ".concat(otp);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, sms.send({
                        to: phone,
                        message: message,
                        from: ''
                    })];
            case 2:
                response = _a.sent();
                console.log(response);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error('Error sending OTP:', error_1);
                throw error_1;
            case 4: return [2 /*return*/];
        }
    });
}); };
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var otp, otpExpiresAt, _a, name_1, password, phone, existingUser, existingPhone, hashedPassword, newUser, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                otp = generateOTP();
                otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                _a = req.body, name_1 = _a.name, password = _a.password, phone = _a.phone;
                return [4 /*yield*/, userModel_1.default.findOne({ name: name_1 })];
            case 2:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, res.status(400).json({ message: 'User already exists' })];
                }
                return [4 /*yield*/, userModel_1.default.findOne({ phone: phone })];
            case 3:
                existingPhone = _b.sent();
                if (existingPhone) {
                    return [2 /*return*/, res.status(401).json({ message: "Phone Number already taken" })];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 4:
                hashedPassword = _b.sent();
                newUser = new userModel_1.default({ name: name_1, password: hashedPassword, phone: phone, otp: otp, otpExpiresAt: otpExpiresAt });
                return [4 /*yield*/, newUser.save()];
            case 5:
                _b.sent();
                return [4 /*yield*/, sendOTP(phone, otp)];
            case 6:
                _b.sent();
                res.status(201).json({ status: 200, message: 'User registered successfully' });
                return [3 /*break*/, 8];
            case 7:
                error_2 = _b.sent();
                console.error(error_2);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var verify = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, phone, otp, user, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, phone = _a.phone, otp = _a.otp;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, userModel_1.default.findOne({ phone: phone, otp: otp })];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid OTP' })];
                }
                if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
                    return [2 /*return*/, res.status(400).json({ message: 'OTP expired' })];
                }
                user.account_verified = true;
                user.otp = undefined;
                user.otpExpiresAt = undefined;
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                res.status(200).json({ message: 'User verified successfully' });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                console.error('Error verifying user:', error_3);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.verify = verify;
var resendOtp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var phone, user, otp, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                phone = req.body.phone;
                if (!phone) {
                    return [2 /*return*/, res.status(400).json({ status: 'error', message: 'Phone number is required' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, userModel_1.default.findOne({ phone: phone })];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ status: 'error', message: 'User not found' })];
                }
                otp = generateOTP();
                user.otp = otp;
                user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                return [4 /*yield*/, sms.send({
                        to: [phone],
                        message: "Your OTP code is ".concat(otp),
                        from: ''
                    })];
            case 4:
                result = _a.sent();
                res.status(200).json({ status: 'success', message: 'OTP resent successfully', result: result });
                return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                console.error('Error resending OTP:', error_4);
                res.status(500).json({ status: 'error', message: 'Internal server error' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.resendOtp = resendOtp;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, phone, password, user, isPasswordValid, token, _b, _, userWithoutPassword, error_5;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                _a = req.body, phone = _a.phone, password = _a.password;
                return [4 /*yield*/, userModel_1.default.findOne({ phone: phone }).select('+password')];
            case 1:
                user = _c.sent();
                // If no user is found, return an error
                if (!user) {
                    return [2 /*return*/, res.status(401).json({ message: 'Invalid credentials' })];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 2:
                isPasswordValid = _c.sent();
                if (!isPasswordValid) {
                    return [2 /*return*/, res.status(401).json({ message: 'Invalid credentials' })];
                }
                token = jsonwebtoken_1.default.sign({ userId: user._id }, jwtUtils_1.JWT_SECRET, { expiresIn: '7d' });
                _b = user.toObject(), _ = _b.password, userWithoutPassword = __rest(_b, ["password"]);
                res.json({ token: token, user: userWithoutPassword });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _c.sent();
                console.error(error_5);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var getUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                return [4 /*yield*/, userModel_1.default.findById(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                res.status(200).json({ user: user });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error(error_6);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userModel_1.default.find()];
            case 1:
                users = _a.sent();
                res.status(200).json({ users: users });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                console.error(error_7);
                res.status(500).json({ message: "Internal server error!" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
var handleProfileImageUpload = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, imageUrl, user;
    return __generator(this, function (_a) {
        try {
            userId = req.params.userId;
            imageUrl = req.body.imageUrl;
            user = userModel_1.default.findById(userId);
            if (!user) {
                return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
            }
            // save image to the database
            // user.profile_picture = imageUrl;
            // await user.save();
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
        return [2 /*return*/];
    });
}); };
exports.handleProfileImageUpload = handleProfileImageUpload;
