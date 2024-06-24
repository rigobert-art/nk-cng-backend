import mongoose, { Document, Schema } from "mongoose";

const GuarantorSchema: Schema = new Schema({
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    // personal data
    first_name: {
        type: String,
        required: false,
        trim: true,
    },
    last_name: {
        type: String,
        required: false,
        trim: true,
    },
    phone: {
        type: String,
        required: false,
        trim: true,
    },
    email: {
        type: String,
        required: false,
        trim: true,
    },
    barua: {
        type: String,
        require: false
    },

    id_front_face: {
        type: String,
        required: false

    },
    id_back_face: {
        type: String,
        require: false,

    },

    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Guarantor', GuarantorSchema)