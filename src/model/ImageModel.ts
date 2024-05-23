import mongoose, { Schema, Document } from 'mongoose';

const ImageSchema: Schema = new Schema({
    Form: {
        type: Schema.Types.ObjectId,
        ref: 'Form',
        required: false
    },
    imageType: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    data: {
        type: Buffer,
        required: true
    },
},{
        timestamps: true,
        versionKey: false
    });

export default mongoose.model('Image', ImageSchema);