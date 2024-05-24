"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const VehicleSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
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
    tracking_device_id: { type: Number, required: false },
    vehicle_picture_1: { type: String },
    vehicle_picture_2: { type: String },
    vehicle_picture_3: { type: String },
    vehicle_picture_4: { type: String },
    vehicle_picture_5: { type: String },
}, {
    timestamps: true,
    versionKey: false
});
exports.default = mongoose_1.default.model('Vehicle', VehicleSchema);
