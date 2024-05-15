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

    created_at: {
    type: Date,
    default: Date.now
},
    updated_at: {
    type: Date,
    default: Date.now
}})


export default mongoose.model("superuser", superUser)