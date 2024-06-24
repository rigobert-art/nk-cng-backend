"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLoanStatus = exports.acceptLoanTerms = exports.updateLoanType = exports.handleMultipleDelete = exports.handleFormDelete = exports.updateForm = exports.getForms = exports.upload_user_middleware = exports.getForm = exports.handleImageUpload = exports.personalForm = exports.uploadMiddleware = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const formModel_1 = __importDefault(require("../model/formModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const loanModel_1 = __importDefault(require("../model/loanModel"));
const multer_1 = __importDefault(require("multer"));
exports.uploadMiddleware = (0, multer_1.default)({ dest: 'user_id/' });
const personalForm = async (req, res) => {
    try {
        const { formId, firstName, lastName, phone, nationalId, ward, city, postalCode, cylinderSize, email, loanType, } = req.body;
        const form = await formModel_1.default.findById(formId);
        if (!form) {
            return res.status(404).json({ message: "Form was not found!" });
        }
        // Update form details
        form.first_name = firstName;
        form.last_name = lastName;
        form.phone = phone;
        form.national_id = nationalId;
        form.address = {
            ward,
            city,
            postal_code: postalCode,
        };
        form.cylinderSize = cylinderSize;
        form.email = email;
        form.loanType = loanType;
        form.status = "submitted";
        // Save the updated form
        await form.save();
        res.status(201).json(form);
    }
    catch (error) {
        console.error('Error updating form:', error);
        res.status(500).json({ status: "Ok", message: 'Internal server error' });
    }
};
exports.personalForm = personalForm;
const handleImageUpload = async (req, res) => {
    try {
        const { formId } = req.body;
        const form = await formModel_1.default.findById(formId);
        if (!form) {
            return res.status(404).json({ message: "Form not found!" });
        }
        // Check if image files are uploaded 
        const files = req.files;
        if (!files || !files.frontId || !files.backId) {
            return res.status(400).json({ message: 'Front and back ID images are required' });
        }
        // Update the form with image paths
        form.front_id_image = files.frontId[0].path;
        form.back_id_image = files.backId[0].path;
        await form.save();
        res.status(200).json({ status: "Ok", message: 'Images Uploaded Successfully' });
    }
    catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.handleImageUpload = handleImageUpload;
// Retrieve form details including image paths
const getForm = async (req, res) => {
    try {
        const { formId } = req.params;
        const form = await formModel_1.default.findById(formId);
        if (!form) {
            return res.status(404).json({ message: "Form not found!" });
        }
        // Send form details along with image paths
        res.status(200).json({
            form,
            front_id_image: form.front_id_image,
            back_id_image: form.back_id_image,
        });
    }
    catch (error) {
        console.error('Error retrieving form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getForm = getForm;
// Apply multer middleware to handle file uploads
exports.upload_user_middleware = exports.uploadMiddleware.fields([
    { name: 'frontId', maxCount: 1 },
    { name: 'backId', maxCount: 1 },
]);
const getForms = async (req, res) => {
    try {
        const forms = await formModel_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(forms);
    }
    catch (error) {
        console.error('Error retrieving forms:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getForms = getForms;
const updateForm = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        // Validate form ID
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid form ID' });
        }
        const updatedForm = await formModel_1.default.findByIdAndUpdate(id, updateData, { new: true }).populate('user').populate('passport');
        if (!updatedForm) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json(updatedForm);
    }
    catch (error) {
        console.error('Error updating form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.updateForm = updateForm;
const handleFormDelete = async (req, res) => {
    try {
        const formId = req.params.id;
        const deletedForm = await formModel_1.default.findByIdAndDelete(formId);
        if (!deletedForm) {
            return res.status(404).json({ error: 'Form not found' });
        }
        // Send a response to the client
        res.status(200).json({ message: 'Form deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting form:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.handleFormDelete = handleFormDelete;
// handle multiple delete
const handleMultipleDelete = async (req, res) => {
    try {
        const formIds = req.body.formIds;
        if (!formIds || !Array.isArray(formIds) || formIds.length === 0) {
            return res.status(400).json({ error: 'Invalid or missing formIds' });
        }
        const validObjectIds = formIds.filter(id => mongoose_1.default.Types.ObjectId.isValid(id));
        if (validObjectIds.length === 0) {
            return res.status(400).json({ error: 'No valid formIds provided' });
        }
        const deletedForms = await formModel_1.default.deleteMany({ _id: { $in: validObjectIds } });
        if (deletedForms.deletedCount === 0) {
            return res.status(404).json({ error: 'No forms found for deletion' });
        }
        res.status(200).json({ message: 'Forms deleted successfully', deletedCount: deletedForms.deletedCount });
    }
    catch (error) {
        console.error('Error deleting forms:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.handleMultipleDelete = handleMultipleDelete;
const updateLoanType = async (req, res) => {
    try {
        const { userId, loanType } = req.body;
        const user = await userModel_1.default.findById(userId);
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
};
exports.updateLoanType = updateLoanType;
const acceptLoanTerms = async (req, res) => {
    const { accepted, userId } = req.body;
    try {
        // check for miss request
        if (!userId || !accepted) {
            return res.status(400).json({ status: "Error", message: "Missing required fields" });
        }
        // check if the user exist
        const user = await userModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }
        // check if user has a form id
        const checkForm = await formModel_1.default.findOne({ User: userId });
        if (checkForm) {
            return res.status(202).json({ status: "Ok", formId: `${checkForm._id}`, message: 'User has form' });
        }
        const newForm = new formModel_1.default({
            agreed_terms: accepted,
            User: userId,
        });
        const saved = await newForm.save();
        res.status(200).json({ status: "Ok", formId: `${saved._id}`, message: " Successful created form!" });
    }
    catch (error) {
        console.error('Error getting images:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.acceptLoanTerms = acceptLoanTerms;
const checkLoanStatus = async (req, res) => {
    const { formId } = req.body;
    try {
        const checkStatus = formModel_1.default.find({ _id: formId, agreed_terms: true });
        if (!checkStatus) {
            return res.status(400).json({ message: "Terms not agreed" });
        }
    }
    catch (error) {
        console.error('Error getting images:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.checkLoanStatus = checkLoanStatus;
