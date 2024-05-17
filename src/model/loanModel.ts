import mongoose, { Schema, Document } from 'mongoose';

const LoanSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applied_for_loan: {
        type: Boolean,
        default: false
    },
    loan_type: {
        type: String,
        enum: ['bank', 'automotive']
    },
    amount_debt_paid: {
        type: Number,
        default: 0
    },
    outstanding_debt: {
        type: Number,
        default: 0
    },
    debt_paid_method: {
        type: String,
        enum: ["cash", "bank", "mobile"]
    },
    debt_paid_date: {
        type: Date,
        default: Date.now
    },
    next_debt_payment: {
        type: Date,
        required: false
    },
    ref: {
        type: String,

    },
    status: { type: String }

},
{
    timestamps: true,
    versionKey: false
});

export default mongoose.model('payment', LoanSchema);