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
exports.updateLoanType = exports.deleteForm = exports.updateForm = exports.getFormById = exports.getForms = exports.upload_user_middleware = exports.createUserForm = exports.uploadMiddleware = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const formModel_1 = __importDefault(require("../model/formModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const loanModel_1 = __importDefault(require("../model/loanModel"));
const multer_1 = __importDefault(require("multer"));
exports.uploadMiddleware = (0, multer_1.default)({ dest: 'user_id/' });
const createUserForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, firstName, lastName, phone, nationalId, ward, city, postalCode, email, loanType, } = req.body;
        const { frontId, backId } = req.files;
        // Validate required fields
        if (!firstName || !lastName || !phone || !postalCode || !email) {
            return res.status(400).json({ message: 'Please fill all the required fields' });
        }
        // Validate user ID
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        // Check if image files are uploaded
        if (!frontId || !backId) {
            return res.status(400).json({ message: 'Front and back ID images are required' });
        }
        // Create new form
        const newForm = new formModel_1.default({
            user_id: userId,
            first_name: firstName,
            last_name: lastName,
            phone,
            national_id: nationalId,
            loanType: loanType,
            address: {
                ward,
                city,
                postal_code: postalCode,
            },
            email,
            front_id_image_path: frontId[0].path,
            back_id_image_path: backId[0].path, // assuming single file uploads
        });
        yield newForm.save();
        res.status(201).json({ status: 201, message: 'Form Submitted Successfully' });
    }
    catch (error) {
        console.error('Error creating form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createUserForm = createUserForm;
// Apply multer middleware to handle file uploads
exports.upload_user_middleware = exports.uploadMiddleware.fields([
    { name: 'frontId', maxCount: 1 },
    { name: 'backId', maxCount: 1 },
]);
const getForms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forms = yield formModel_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(forms);
    }
    catch (error) {
        console.error('Error retrieving forms:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getForms = getForms;
const getFormById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Validate form ID
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid form ID' });
        }
        const form = yield formModel_1.default.findById(id).populate('user').populate('passport');
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json(form);
    }
    catch (error) {
        console.error('Error retrieving form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getFormById = getFormById;
const updateForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        // Validate form ID
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid form ID' });
        }
        const updatedForm = yield formModel_1.default.findByIdAndUpdate(id, updateData, { new: true }).populate('user').populate('passport');
        if (!updatedForm) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json(updatedForm);
    }
    catch (error) {
        console.error('Error updating form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateForm = updateForm;
const deleteForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Validate form ID
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid form ID' });
        }
        const deletedForm = yield formModel_1.default.findByIdAndDelete(id);
        if (!deletedForm) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json({ message: 'Form deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteForm = deleteForm;
const updateLoanType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, loanType } = req.body;
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!loanType) {
            return res.status(400).json({ message: 'Loan type is required' });
        }
        const newForm = new formModel_1.default({
            User: userId,
        });
        newForm.save();
        const newLoan = new loanModel_1.default({
            Form: newForm._id,
            loan_type: loanType,
        });
        newLoan.save();
    }
    catch (error) {
        console.error('Error getting images:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateLoanType = updateLoanType;
