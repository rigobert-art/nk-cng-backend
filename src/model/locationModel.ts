import mongoose from "mongoose";

const Schema = mongoose.Schema

const LocationSchema = new Schema({
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})


export default mongoose.model("Location", LocationSchema)