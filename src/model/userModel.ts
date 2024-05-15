import mongoose, { Schema, Document } from 'mongoose';

const UserSchema: Schema = new Schema({
    // auth staff
    email: {
        type: String,
        unique: true,
        lowercase: true, 
        trim: true, 
    },
    password: {
        type: String,
        required: true,
        minlength: 8, 
    },
    name: {
        type: String,
        required: true,
    },

    // personal details
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
    profile_picture: {
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
});

export default mongoose.model('User', UserSchema);