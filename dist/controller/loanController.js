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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLoanTypeAndInitialAmount = exports.deleteLoanById = exports.updateLoanById = exports.approveLoan = exports.getLoanById = exports.getAllLoans = void 0;
const loanModel_1 = __importDefault(require("../model/loanModel")); // Import your Loan model
const formModel_1 = __importDefault(require("../model/formModel"));
const africastalking_1 = __importDefault(require("africastalking"));
const formModel_2 = __importDefault(require("../model/formModel"));
// Initialize Africa's Talking with your API key and username
const at = (0, africastalking_1.default)({
    apiKey: 'YOUR_API_KEY',
    username: 'YOUR_USERNAME'
});
const sms = at.SMS;
// Controller function to get all loans
const getAllLoans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loans = yield loanModel_1.default.find();
        return res.status(200).json(loans);
    }
    catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
});
exports.getAllLoans = getAllLoans;
// // Controller function to get a loan by ID
const getLoanById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loan = yield loanModel_1.default.findById(req.params.id);
        if (!loan) {
            return res.status(404).json({ error: 'Loan not found' });
        }
        return res.status(200).json(loan);
    }
    catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
});
exports.getLoanById = getLoanById;
const approveLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const updatedUser = yield formModel_1.default.findByIdAndUpdate(userId, {
            is_approved: true,
            approved_date: new Date()
        }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const phoneNumber = updatedUser.phone; // Assuming the user model has a phoneNumber field
        const message = `Dear ${updatedUser.first_name} ${updatedUser.last_name}, your loan has been approved.`;
        const options = {
            to: "",
            message: message,
            from: ""
        };
        sms.send(options)
            .then((response) => {
            console.log('SMS sent successfully:', response);
        })
            .catch((error) => {
            console.error('Error sending SMS:', error);
        });
        res.json(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.approveLoan = approveLoan;
// // Controller function to update a loan by ID
const updateLoanById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loan = yield loanModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!loan) {
            return res.status(404).json({ error: 'Loan not found' });
        }
        return res.status(200).json(loan);
    }
    catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
});
exports.updateLoanById = updateLoanById;
// // Controller function to delete a loan by ID
const deleteLoanById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loan = yield loanModel_1.default.findByIdAndDelete(req.params.id);
        if (!loan) {
            return res.status(404).json({ error: 'Loan not found' });
        }
        return res.status(200).json({ message: 'Loan deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
});
exports.deleteLoanById = deleteLoanById;
const updateLoanTypeAndInitialAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, initial_amount } = req.body;
        const updatedUser = yield formModel_2.default.findByIdAndUpdate(userId, {
            is_loan_type: true,
            is_initial_paid: true,
            initial_amount
        }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateLoanTypeAndInitialAmount = updateLoanTypeAndInitialAmount;
