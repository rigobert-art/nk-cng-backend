"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const LoanSchema = new mongoose_1.Schema({
    form: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Form',
        required: false
    },
    loan_reference: {
        type: Number,
        required: true,
        unique: true,
        desc: "The reference of the loan"
    },
    loan_type: {
        type: String,
        enum: ['Maendeleo Bank Loan', 'NK CNG Automotive Loan']
    },
    total_loan_amount: {
        type: Number,
        default: 0,
        dec: "The total loan the user is applying for"
    },
    initial_loan_amount: {
        type: Number,
        default: 0,
        desc: "The initial amount the user is required to pay"
    },
    loan_duration: {
        type: Number,
        default: 0,
        desc: "The duration of the loan in months"
    },
    loan_tenure: {
        type: Number,
        default: 0,
        desc: "The tenure of the loan in months"
    },
    interest_rate: {
        type: Number,
        default: 0,
        desc: "The interest rate of the loan"
    },
    interest_amount: {
        type: Number,
        default: 0,
        desc: "The interest amount of the loan"
    },
    requirement_to_apply: {
        type: [String],
        default: [],
        desc: "The requirement to apply for the loan"
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = mongoose_1.default.model('Loan', LoanSchema);
