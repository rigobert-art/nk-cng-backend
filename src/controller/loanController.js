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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLoanTypeAndInitialAmount = exports.deleteLoanById = exports.updateLoanById = exports.approveLoan = exports.getLoanById = exports.getAllLoans = void 0;
var loanModel_1 = __importDefault(require("../model/loanModel")); // Import your Loan model
var formModel_1 = __importDefault(require("../model/formModel"));
var africastalking_1 = __importDefault(require("africastalking"));
var formModel_2 = __importDefault(require("../model/formModel"));
// Initialize Africa's Talking with your API key and username
var at = (0, africastalking_1.default)({
    apiKey: 'YOUR_API_KEY',
    username: 'YOUR_USERNAME'
});
var sms = at.SMS;
// Controller function to get all loans
var getAllLoans = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loans, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, loanModel_1.default.find()];
            case 1:
                loans = _a.sent();
                return [2 /*return*/, res.status(200).json(loans)];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: 'Server error' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllLoans = getAllLoans;
// // Controller function to get a loan by ID
var getLoanById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loan, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, loanModel_1.default.findById(req.params.id)];
            case 1:
                loan = _a.sent();
                if (!loan) {
                    return [2 /*return*/, res.status(404).json({ error: 'Loan not found' })];
                }
                return [2 /*return*/, res.status(200).json(loan)];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: 'Server error' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getLoanById = getLoanById;
var approveLoan = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, updatedUser, phoneNumber, message, options, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                return [4 /*yield*/, formModel_1.default.findByIdAndUpdate(userId, {
                        is_approved: true,
                        approved_date: new Date()
                    }, { new: true })];
            case 1:
                updatedUser = _a.sent();
                if (!updatedUser) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                phoneNumber = updatedUser.phone;
                message = "Dear ".concat(updatedUser.first_name, " ").concat(updatedUser.last_name, ", your loan has been approved.");
                options = {
                    to: "",
                    message: message,
                    from: ""
                };
                sms.send(options)
                    .then(function (response) {
                    console.log('SMS sent successfully:', response);
                })
                    .catch(function (error) {
                    console.error('Error sending SMS:', error);
                });
                res.json(updatedUser);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.approveLoan = approveLoan;
// // Controller function to update a loan by ID
var updateLoanById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loan, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, loanModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true })];
            case 1:
                loan = _a.sent();
                if (!loan) {
                    return [2 /*return*/, res.status(404).json({ error: 'Loan not found' })];
                }
                return [2 /*return*/, res.status(200).json(loan)];
            case 2:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: 'Server error' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateLoanById = updateLoanById;
// // Controller function to delete a loan by ID
var deleteLoanById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loan, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, loanModel_1.default.findByIdAndDelete(req.params.id)];
            case 1:
                loan = _a.sent();
                if (!loan) {
                    return [2 /*return*/, res.status(404).json({ error: 'Loan not found' })];
                }
                return [2 /*return*/, res.status(200).json({ message: 'Loan deleted successfully' })];
            case 2:
                error_5 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: 'Server error' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteLoanById = deleteLoanById;
var updateLoanTypeAndInitialAmount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, initial_amount, updatedUser, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, userId = _a.userId, initial_amount = _a.initial_amount;
                return [4 /*yield*/, formModel_2.default.findByIdAndUpdate(userId, {
                        is_loan_type: true,
                        is_initial_paid: true,
                        initial_amount: initial_amount
                    }, { new: true })];
            case 1:
                updatedUser = _b.sent();
                if (!updatedUser) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                res.json(updatedUser);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _b.sent();
                console.error(error_6);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateLoanTypeAndInitialAmount = updateLoanTypeAndInitialAmount;
