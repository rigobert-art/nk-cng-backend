"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const formController_1 = require("../controller/formController");
const router = express_1.default.Router();
router.post('/personal_details', formController_1.createUserForm);
router.get('/getAll', formController_1.getForms);
router.get('/getById/:id', formController_1.getFormById);
// router.get('/user/:userId', getUserImage);
exports.default = router;
