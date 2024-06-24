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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLoanStatus = exports.acceptLoanTerms = exports.updateLoanType = exports.handleMultipleDelete = exports.handleFormDelete = exports.updateForm = exports.getForms = exports.upload_user_middleware = exports.getForm = exports.handleImageUpload = exports.personalForm = exports.uploadMiddleware = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var formModel_1 = __importDefault(require("../model/formModel"));
var userModel_1 = __importDefault(require("../model/userModel"));
var loanModel_1 = __importDefault(require("../model/loanModel"));
var multer_1 = __importDefault(require("multer"));
exports.uploadMiddleware = (0, multer_1.default)({ dest: 'user_id/' });
var personalForm = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, formId, firstName, lastName, phone, nationalId, ward, city, postalCode, cylinderSize, email, loanType, form, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, formId = _a.formId, firstName = _a.firstName, lastName = _a.lastName, phone = _a.phone, nationalId = _a.nationalId, ward = _a.ward, city = _a.city, postalCode = _a.postalCode, cylinderSize = _a.cylinderSize, email = _a.email, loanType = _a.loanType;
                return [4 /*yield*/, formModel_1.default.findById(formId)];
            case 1:
                form = _b.sent();
                if (!form) {
                    return [2 /*return*/, res.status(404).json({ message: "Form was not found!" })];
                }
                // Update form details
                form.first_name = firstName;
                form.last_name = lastName;
                form.phone = phone;
                form.national_id = nationalId;
                form.address = {
                    ward: ward,
                    city: city,
                    postal_code: postalCode,
                };
                form.cylinderSize = cylinderSize;
                form.email = email;
                form.loanType = loanType;
                form.status = "submitted";
                // Save the updated form
                return [4 /*yield*/, form.save()];
            case 2:
                // Save the updated form
                _b.sent();
                res.status(201).json(form);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error('Error updating form:', error_1);
                res.status(500).json({ status: "Ok", message: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.personalForm = personalForm;
var handleImageUpload = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var formId, form, files, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                formId = req.body.formId;
                return [4 /*yield*/, formModel_1.default.findById(formId)];
            case 1:
                form = _a.sent();
                if (!form) {
                    return [2 /*return*/, res.status(404).json({ message: "Form not found!" })];
                }
                files = req.files;
                if (!files || !files.frontId || !files.backId) {
                    return [2 /*return*/, res.status(400).json({ message: 'Front and back ID images are required' })];
                }
                // Update the form with image paths
                form.front_id_image = files.frontId[0].path;
                form.back_id_image = files.backId[0].path;
                return [4 /*yield*/, form.save()];
            case 2:
                _a.sent();
                res.status(200).json({ status: "Ok", message: 'Images Uploaded Successfully' });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error('Error uploading images:', error_2);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.handleImageUpload = handleImageUpload;
// Retrieve form details including image paths
var getForm = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var formId, form, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                formId = req.params.formId;
                return [4 /*yield*/, formModel_1.default.findById(formId)];
            case 1:
                form = _a.sent();
                if (!form) {
                    return [2 /*return*/, res.status(404).json({ message: "Form not found!" })];
                }
                // Send form details along with image paths
                res.status(200).json({
                    form: form,
                    front_id_image: form.front_id_image,
                    back_id_image: form.back_id_image,
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error('Error retrieving form:', error_3);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getForm = getForm;
// Apply multer middleware to handle file uploads
exports.upload_user_middleware = exports.uploadMiddleware.fields([
    { name: 'frontId', maxCount: 1 },
    { name: 'backId', maxCount: 1 },
]);
var getForms = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var forms, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, formModel_1.default.find().sort({ createdAt: -1 })];
            case 1:
                forms = _a.sent();
                res.status(200).json(forms);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error('Error retrieving forms:', error_4);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getForms = getForms;
var updateForm = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updateData, updatedForm, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                updateData = req.body;
                // Validate form ID
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid form ID' })];
                }
                return [4 /*yield*/, formModel_1.default.findByIdAndUpdate(id, updateData, { new: true }).populate('user').populate('passport')];
            case 1:
                updatedForm = _a.sent();
                if (!updatedForm) {
                    return [2 /*return*/, res.status(404).json({ message: 'Form not found' })];
                }
                res.status(200).json(updatedForm);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error('Error updating form:', error_5);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateForm = updateForm;
var handleFormDelete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var formId, deletedForm, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                formId = req.params.id;
                return [4 /*yield*/, formModel_1.default.findByIdAndDelete(formId)];
            case 1:
                deletedForm = _a.sent();
                if (!deletedForm) {
                    return [2 /*return*/, res.status(404).json({ error: 'Form not found' })];
                }
                // Send a response to the client
                res.status(200).json({ message: 'Form deleted successfully' });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error('Error deleting form:', error_6);
                res.status(500).json({ error: 'Internal Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.handleFormDelete = handleFormDelete;
// handle multiple delete
var handleMultipleDelete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var formIds, validObjectIds, deletedForms, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                formIds = req.body.formIds;
                if (!formIds || !Array.isArray(formIds) || formIds.length === 0) {
                    return [2 /*return*/, res.status(400).json({ error: 'Invalid or missing formIds' })];
                }
                validObjectIds = formIds.filter(function (id) { return mongoose_1.default.Types.ObjectId.isValid(id); });
                if (validObjectIds.length === 0) {
                    return [2 /*return*/, res.status(400).json({ error: 'No valid formIds provided' })];
                }
                return [4 /*yield*/, formModel_1.default.deleteMany({ _id: { $in: validObjectIds } })];
            case 1:
                deletedForms = _a.sent();
                if (deletedForms.deletedCount === 0) {
                    return [2 /*return*/, res.status(404).json({ error: 'No forms found for deletion' })];
                }
                res.status(200).json({ message: 'Forms deleted successfully', deletedCount: deletedForms.deletedCount });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                console.error('Error deleting forms:', error_7);
                res.status(500).json({ error: 'Internal Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.handleMultipleDelete = handleMultipleDelete;
var updateLoanType = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, loanType, user, newForm, newLoan, error_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, userId = _a.userId, loanType = _a.loanType;
                return [4 /*yield*/, userModel_1.default.findById(userId)];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                if (!loanType) {
                    return [2 /*return*/, res.status(400).json({ message: 'Loan type is required' })];
                }
                newForm = new formModel_1.default({
                    User: userId,
                });
                newForm.save();
                newLoan = new loanModel_1.default({
                    Form: newForm._id,
                    loan_type: loanType,
                });
                newLoan.save();
                return [3 /*break*/, 3];
            case 2:
                error_8 = _b.sent();
                console.error('Error getting images:', error_8);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateLoanType = updateLoanType;
var acceptLoanTerms = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, accepted, userId, user, checkForm, newForm, saved, error_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, accepted = _a.accepted, userId = _a.userId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                // check for miss request
                if (!userId || !accepted) {
                    return [2 /*return*/, res.status(400).json({ status: "Error", message: "Missing required fields" })];
                }
                return [4 /*yield*/, userModel_1.default.findById(userId)];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ status: "Error", message: "User not found" })];
                }
                return [4 /*yield*/, formModel_1.default.findOne({ User: userId })];
            case 3:
                checkForm = _b.sent();
                if (checkForm) {
                    return [2 /*return*/, res.status(202).json({ status: "Ok", formId: "".concat(checkForm._id), message: 'User has form' })];
                }
                newForm = new formModel_1.default({
                    agreed_terms: accepted,
                    User: userId,
                });
                return [4 /*yield*/, newForm.save()];
            case 4:
                saved = _b.sent();
                res.status(200).json({ status: "Ok", formId: "".concat(saved._id), message: " Successful created form!" });
                return [3 /*break*/, 6];
            case 5:
                error_9 = _b.sent();
                console.error('Error getting images:', error_9);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.acceptLoanTerms = acceptLoanTerms;
var checkLoanStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var formId, checkStatus;
    return __generator(this, function (_a) {
        formId = req.body.formId;
        try {
            checkStatus = formModel_1.default.find({ _id: formId, agreed_terms: true });
            if (!checkStatus) {
                return [2 /*return*/, res.status(400).json({ message: "Terms not agreed" })];
            }
        }
        catch (error) {
            console.error('Error getting images:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
        return [2 /*return*/];
    });
}); };
exports.checkLoanStatus = checkLoanStatus;
