import mongoose from "mongoose";

const Schema = mongoose.Schema

const superUser = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
})


export default mongoose.model("superuser", superUser)