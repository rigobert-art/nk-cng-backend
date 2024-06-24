import mongoose, { Schema, Document } from 'mongoose';

const LoanSchema: Schema = new Schema({
    form: {
        type: Schema.Types.ObjectId,
        ref: 'Form',
        required: false
    },
    name: {
        type: String,
        required: true
    },
    loan_reference: { //auto generate
        type: Number,
        required: false,
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
    total_loan_balance: {
        type: String,
        required: false,
        desc: "The total loan balance"
    },
    initial_loan_amount: {
        type: Boolean,
        default: false,
        desc: "The initial amount the user is required to pay"
    },
    loan_expire_date: {
        type: Date,
        default: new Date(),
        desc: "The duration of the loan in months"
    },

},

{
    timestamps: true,
    versionKey: false
});

export default mongoose.model('Loan', LoanSchema);