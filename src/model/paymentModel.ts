import mongoose, { Schema, Document } from 'mongoose';

const PaymentSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    paid: { type: Number, required: true },
    paid_date: { type: Date, default: Date.now },
    outstanding_balance: { type: Number },
    over_paid: { type: Number },
    disc: { type: Number },
    ref: { type: String },

    card_number: { type: String, required: true },
    expiration_date: { type: String, required: true },
    cvv: { type: String, required: true },
    status: { type: String }

});