import mongoose, { Schema, Document } from 'mongoose';

const LoanSchema: Schema = new Schema({
    form: {
        type: Schema.Types.ObjectId,
        ref: 'Form',
        required: false
    },
    loan_reference: { //auto generate
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
},

{
    timestamps: true,
    versionKey: false
});

export default mongoose.model('Loan', LoanSchema);