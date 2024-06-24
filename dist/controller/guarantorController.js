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
exports.deleteGuarantor = exports.updateGuarantor = exports.getGuarantorById = exports.getGuarantors = exports.createGuarantor = exports.upload = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const guarantorModel_1 = __importDefault(require("../model/guarantorModel"));
const multer_1 = __importDefault(require("multer"));
// Configure multer storage
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
// Multer middleware
exports.upload = (0, multer_1.default)({ storage });
// Create a new guarantor
const createGuarantor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, phone } = req.body;
        const files = req.files;
        if (!files || !files['nationalIdFront'] || !files['nationalIdBack'] || !files['letterFile']) {
            return res.status(400).json({ message: 'Missing required files' });
        }
        const nationalIdFront = files['nationalIdFront'][0];
        const nationalIdBack = files['nationalIdBack'][0];
        const letterFile = files['letterFile'][0];
        const guarantor = new guarantorModel_1.default({
            firstName,
            lastName,
            email,
            phone,
            nationalIdFrontPath: nationalIdFront.path,
            nationalIdBackPath: nationalIdBack.path,
            letterFilePath: letterFile.path,
        });
        yield guarantor.save();
        res.status(201).json(guarantor);
    }
    catch (error) {
        console.error('Error creating guarantor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createGuarantor = createGuarantor;
// Get all guarantors
const getGuarantors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guarantors = yield guarantorModel_1.default.find();
        res.status(200).json(guarantors);
    }
    catch (error) {
        console.error('Error fetching guarantors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getGuarantors = getGuarantors;
// Get a guarantor by ID
const getGuarantorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        const guarantor = yield guarantorModel_1.default.findById(id);
        if (!guarantor) {
            return res.status(404).json({ message: 'Guarantor not found' });
        }
        res.status(200).json(guarantor);
    }
    catch (error) {
        console.error('Error fetching guarantor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getGuarantorById = getGuarantorById;
// Update a guarantor
const updateGuarantor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        const guarantor = yield guarantorModel_1.default.findByIdAndUpdate(id, updates, { new: true });
        if (!guarantor) {
            return res.status(404).json({ message: 'Guarantor not found' });
        }
        res.status(200).json(guarantor);
    }
    catch (error) {
        console.error('Error updating guarantor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateGuarantor = updateGuarantor;
// Delete a guarantor
const deleteGuarantor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        const guarantor = yield guarantorModel_1.default.findByIdAndDelete(id);
        if (!guarantor) {
            return res.status(404).json({ message: 'Guarantor not found' });
        }
        res.status(200).json({ message: 'Guarantor deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting guarantor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteGuarantor = deleteGuarantor;
