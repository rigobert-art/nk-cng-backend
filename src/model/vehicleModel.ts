import mongoose, { Schema, Document } from 'mongoose';

const VehicleSchema: Schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    vin: { type: String, unique: true, sparse: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String },
    license_plate: { type: String, unique: true, sparse: true },
    registration_state: { type: String },
    owner_name: { type: String },
    owner_contact: { type: String },
    odometer_reading: { type: Number },
    fuel_type: { type: String, enum: ['gasoline', 'diesel', 'electric', 'hybrid'] },
    engine_size: { type: String },
    transmission_type: { type: String, enum: ['automatic', 'manual'] },
    has_tracking_device: { type: Boolean, default: false },
    tracking_device_id: {type: Number, required: false },
    vehicle_picture_1: { type: String },
    vehicle_picture_2: { type: String },
    vehicle_picture_3: { type: String },
    vehicle_picture_4: { type: String },
    vehicle_picture_5: { type: String },

}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('Vehicle', VehicleSchema);