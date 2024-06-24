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
exports.deleteVehicle = exports.updateVehicle = exports.getVehicleById = exports.getVehicles = exports.createVehicle = exports.upload = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var vehicleModel_1 = __importDefault(require("../model/vehicleModel"));
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, "".concat(Date.now(), "-").concat(file.originalname));
    }
});
exports.upload = (0, multer_1.default)({ storage: storage });
var createVehicle = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, make, model, year, vin, color, registrationCard, vehicle, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, make = _a.make, model = _a.model, year = _a.year, vin = _a.vin, color = _a.color;
                registrationCard = req.file;
                if (!registrationCard) {
                    return [2 /*return*/, res.status(400).json({ message: 'Registration card file is required' })];
                }
                vehicle = new vehicleModel_1.default({
                    make: make,
                    model: model,
                    year: year,
                    vin: vin,
                    color: color,
                    registrationCardPath: registrationCard.path,
                });
                return [4 /*yield*/, vehicle.save()];
            case 1:
                _b.sent();
                res.status(201).json(vehicle);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.error('Error creating vehicle:', error_1);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createVehicle = createVehicle;
var getVehicles = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var vehicles, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, vehicleModel_1.default.find()];
            case 1:
                vehicles = _a.sent();
                res.status(200).json(vehicles);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('Error fetching vehicles:', error_2);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getVehicles = getVehicles;
var getVehicleById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, vehicle, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid ID' })];
                }
                return [4 /*yield*/, vehicleModel_1.default.findById(id)];
            case 1:
                vehicle = _a.sent();
                if (!vehicle) {
                    return [2 /*return*/, res.status(404).json({ message: 'Vehicle not found' })];
                }
                res.status(200).json(vehicle);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error('Error fetching vehicle:', error_3);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getVehicleById = getVehicleById;
var updateVehicle = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updates, vehicle, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                updates = req.body;
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid ID' })];
                }
                return [4 /*yield*/, vehicleModel_1.default.findByIdAndUpdate(id, updates, { new: true })];
            case 1:
                vehicle = _a.sent();
                if (!vehicle) {
                    return [2 /*return*/, res.status(404).json({ message: 'Vehicle not found' })];
                }
                res.status(200).json(vehicle);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error('Error updating vehicle:', error_4);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateVehicle = updateVehicle;
var deleteVehicle = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, vehicle, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid ID' })];
                }
                return [4 /*yield*/, vehicleModel_1.default.findByIdAndDelete(id)];
            case 1:
                vehicle = _a.sent();
                if (!vehicle) {
                    return [2 /*return*/, res.status(404).json({ message: 'Vehicle not found' })];
                }
                res.status(200).json({ message: 'Vehicle deleted successfully' });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error('Error deleting vehicle:', error_5);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteVehicle = deleteVehicle;
