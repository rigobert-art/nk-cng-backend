// This model tracks all loan requested requested by the user and allow office to approve them


import mongoose, { Schema, Document } from 'mongoose';

const RequestSchema: Schema = new Schema({
    loan: {
        type: Schema.Types.ObjectId,
        ref: 'Loan',
        required: true
    },
    status: {
        type: String,
        enum: [ "Approved", "Rejected"]
    },
    is_loan_type: {
        type: Boolean,
        default: false
    },
    is_initial_paid: {
        type: Boolean,
        default: false,
    },
    initial_amount: {
        type: Number,
        default: 0,
    },
    is_approved: {
        type: Boolean,
        default: false,
    }, 
    approved_date: {
        type: Date,
        default: Date.now,
    }

    
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('Request', RequestSchema);