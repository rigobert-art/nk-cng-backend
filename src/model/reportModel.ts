import mongoose from "mongoose";

const Schema = mongoose.Schema

const ReportSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})


export default mongoose.model("Report", ReportSchema)