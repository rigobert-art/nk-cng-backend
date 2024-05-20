import mongoose from "mongoose";

const Schema = mongoose.Schema

const superUser = new Schema({
    username: {
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
        type: String,
        required: false
    },
}, {
    timestamps: true,
    versionKey: false
})


export default mongoose.model("superuser", superUser)