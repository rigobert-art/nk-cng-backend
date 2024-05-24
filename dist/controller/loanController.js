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
exports.updateLoanTypeAndInitialAmount = exports.deleteLoanById = exports.updateLoanById = exports.approveLoan = exports.getLoanById = exports.getAllLoans = exports.createLoan = void 0;
const loanModel_1 = __importDefault(require("../model/loanModel")); // Import your Loan model
const formModel_1 = __importDefault(require("../model/formModel"));
// Controller function to create a new loan
const createLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { loan_reference } = yield loanModel_1.default.create(req.body);
        let loan_type;
        let initial_loan_amount;
        let requirement_to_apply;
        const existingRef = yield loanModel_1.default.findOne({ loan_reference });
        if (loan_reference == 2002) {
            loan_type = 'Maendeleo Bank Loan';
            initial_loan_amount = 0;
            requirement_to_apply = [
                "Original vehicle registration card",
                "Copy of NIDA Identification Card",
                "Identification letter from local government"
            ];
        }
        if (loan_reference == 2003) {
            loan_type = 'NK CNG Automotive Loan';
            initial_loan_amount = 800000;
            requirement_to_apply = [
                "Original vehicle registration card",
                "Copy of NIDA Identification Card",
                "ID letter from local government",
                "ID letter of Mdhamini from local government",
                "ID letter of Mdhamini with permanent contract",
                "Copy of NIDA of Mdhamini",
            ];
        }
        const existingType = yield loanModel_1.default.findOne({ loan_reference });
        if (existingRef || existingType) {
            return res.status(409).json({ status: 409, error: 'Loan already exists' });
        }
        const newLoan = new loanModel_1.default({ loan_reference, initial_loan_amount, requirement_to_apply });
        yield newLoan.save();
        return res.status(201).json({ status: 200, message: "Create loan successfully" });
    }
    catch (error) {
        return res.status(500).json({ status: 500, error: 'Server error' });
    }
});
exports.createLoan = createLoan;
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
        const updatedUser = yield formModel_1.default.findByIdAndUpdate(userId, {
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
