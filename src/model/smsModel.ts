import mongoose, { Schema, Document } from 'mongoose';

const SMSSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sms_type: {
        type: String,
        enum: [""]
   }

},
{
    timestamps: true,
    versionKey: false
});

export default mongoose.model('SMS', SMSSchema);