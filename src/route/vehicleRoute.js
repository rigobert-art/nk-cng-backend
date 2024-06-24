"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var vehicleController_1 = require("../controller/vehicleController");
var router = express_1.default.Router();
router.post('/vehicle', vehicleController_1.upload.single('registrationCard'), vehicleController_1.createVehicle);
router.get('/vehicle', vehicleController_1.getVehicles);
router.get('/vehicle/:id', vehicleController_1.getVehicleById);
router.put('/vehicle/:id', vehicleController_1.updateVehicle);
router.delete('/vehicle/:id', vehicleController_1.deleteVehicle);
exports.default = router;
