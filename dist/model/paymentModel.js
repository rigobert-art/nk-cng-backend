"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
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
