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
exports.deleteGuarantor = exports.updateGuarantor = exports.getGuarantorById = exports.getGuarantors = exports.createGuarantor = exports.upload = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var guarantorModel_1 = __importDefault(require("../model/guarantorModel"));
var multer_1 = __importDefault(require("multer"));
// Configure multer storage
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, "".concat(Date.now(), "-").concat(file.originalname));
    }
});
// Multer middleware
exports.upload = (0, multer_1.default)({ storage: storage });
// Create a new guarantor
var createGuarantor = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, email, phone, files, nationalIdFront, nationalIdBack, letterFile, guarantor, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, phone = _a.phone;
                files = req.files;
                if (!files || !files['nationalIdFront'] || !files['nationalIdBack'] || !files['letterFile']) {
                    return [2 /*return*/, res.status(400).json({ message: 'Missing required files' })];
                }
                nationalIdFront = files['nationalIdFront'][0];
                nationalIdBack = files['nationalIdBack'][0];
                letterFile = files['letterFile'][0];
                guarantor = new guarantorModel_1.default({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    nationalIdFrontPath: nationalIdFront.path,
                    nationalIdBackPath: nationalIdBack.path,
                    letterFilePath: letterFile.path,
                });
                return [4 /*yield*/, guarantor.save()];
            case 1:
                _b.sent();
                res.status(201).json(guarantor);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.error('Error creating guarantor:', error_1);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createGuarantor = createGuarantor;
// Get all guarantors
var getGuarantors = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var guarantors, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, guarantorModel_1.default.find()];
            case 1:
                guarantors = _a.sent();
                res.status(200).json(guarantors);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('Error fetching guarantors:', error_2);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getGuarantors = getGuarantors;
// Get a guarantor by ID
var getGuarantorById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, guarantor, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid ID' })];
                }
                return [4 /*yield*/, guarantorModel_1.default.findById(id)];
            case 1:
                guarantor = _a.sent();
                if (!guarantor) {
                    return [2 /*return*/, res.status(404).json({ message: 'Guarantor not found' })];
                }
                res.status(200).json(guarantor);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error('Error fetching guarantor:', error_3);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getGuarantorById = getGuarantorById;
// Update a guarantor
var updateGuarantor = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updates, guarantor, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                updates = req.body;
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid ID' })];
                }
                return [4 /*yield*/, guarantorModel_1.default.findByIdAndUpdate(id, updates, { new: true })];
            case 1:
                guarantor = _a.sent();
                if (!guarantor) {
                    return [2 /*return*/, res.status(404).json({ message: 'Guarantor not found' })];
                }
                res.status(200).json(guarantor);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error('Error updating guarantor:', error_4);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateGuarantor = updateGuarantor;
// Delete a guarantor
var deleteGuarantor = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, guarantor, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid ID' })];
                }
                return [4 /*yield*/, guarantorModel_1.default.findByIdAndDelete(id)];
            case 1:
                guarantor = _a.sent();
                if (!guarantor) {
                    return [2 /*return*/, res.status(404).json({ message: 'Guarantor not found' })];
                }
                res.status(200).json({ message: 'Guarantor deleted successfully' });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error('Error deleting guarantor:', error_5);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteGuarantor = deleteGuarantor;
