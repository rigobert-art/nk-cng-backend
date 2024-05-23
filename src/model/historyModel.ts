import mongoose, { Document, Schema} from "mongoose";


const HistorySchema: Schema = new Schema({

    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    status: {
        type: String, 
        required: true,

    },
    amount_paid: {
        type: String,
        required: true
    },
    amount_left: {
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
    }

})

export default mongoose.model('History', HistorySchema)