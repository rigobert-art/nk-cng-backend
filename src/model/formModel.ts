import mongoose, { Document, Schema } from "mongoose";

const FormSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
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
    national_id: {
        type: String,
        require: false,
        unique: true,
        trim: true
    },
    address: {
        type: String,
        required: false,
        trim: true,
    },
    city: {
        type: String,
        required: false,
        trim: true,
    },
    country: {
        type: String,
        required: false,
        trim: true,
    },
    zip: {
        type: String,
        required: false,
        trim: true
    },
    // passport: {
    //     type: Schema.ObjectId,
    //     ref: 'profilePic',
    //     required: true,
    // },

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