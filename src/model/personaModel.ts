import mongoose, { Document, Schema } from "mongoose";

const FormSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    national_id: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    postal_code: {
        type: String,
        required: true,
        trim: true
    },
    passport: {
        type: Schema.ObjectId,
        ref: 'profilePic',
        required: true,
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

export default mongoose.model('Form', FormSchema)