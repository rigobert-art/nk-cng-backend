"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var guarantorController_1 = require("../controller/guarantorController");
var router = express_1.default.Router();
router.post('/guarantors', guarantorController_1.upload.fields([
    { name: 'nationalIdFront', maxCount: 1 },
    { name: 'nationalIdBack', maxCount: 1 },
    { name: 'letterFile', maxCount: 1 }
]), guarantorController_1.createGuarantor);
router.get('/guarantors', guarantorController_1.getGuarantors);
router.get('/guarantors/:id', guarantorController_1.getGuarantorById);
router.put('/guarantors/:id', guarantorController_1.updateGuarantor);
router.delete('/guarantors/:id', guarantorController_1.deleteGuarantor);
exports.default = router;
