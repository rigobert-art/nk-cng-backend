"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicle = exports.updateVehicle = exports.getVehicleById = exports.getVehicles = exports.createVehicle = exports.upload = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const vehicleModel_1 = __importDefault(require("../model/vehicleModel"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
exports.upload = (0, multer_1.default)({ storage });
const createVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { make, model, year, vin, color } = req.body;
        const registrationCard = req.file;
        if (!registrationCard) {
            return res.status(400).json({ message: 'Registration card file is required' });
        }
        const vehicle = new vehicleModel_1.default({
            make,
            model,
            year,
            vin,
            color,
            registrationCardPath: registrationCard.path,
        });
        yield vehicle.save();
        res.status(201).json(vehicle);
    }
    catch (error) {
        console.error('Error creating vehicle:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createVehicle = createVehicle;
const getVehicles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicles = yield vehicleModel_1.default.find();
        res.status(200).json(vehicles);
    }
    catch (error) {
        console.error('Error fetching vehicles:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getVehicles = getVehicles;
const getVehicleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        const vehicle = yield vehicleModel_1.default.findById(id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json(vehicle);
    }
    catch (error) {
        console.error('Error fetching vehicle:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getVehicleById = getVehicleById;
const updateVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        const vehicle = yield vehicleModel_1.default.findByIdAndUpdate(id, updates, { new: true });
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json(vehicle);
    }
    catch (error) {
        console.error('Error updating vehicle:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateVehicle = updateVehicle;
const deleteVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        const vehicle = yield vehicleModel_1.default.findByIdAndDelete(id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json({ message: 'Vehicle deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting vehicle:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteVehicle = deleteVehicle;
