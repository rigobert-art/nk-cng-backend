import mongoose, { Schema, Document } from 'mongoose';

const ImageSchema: Schema = new Schema({
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    imageType: {
        type: String,
        enum: ['national_id', 'passport', 'license', 'insurance'],
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