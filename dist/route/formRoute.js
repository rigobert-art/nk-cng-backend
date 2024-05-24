"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const formController_1 = require("../controller/formController");
const storage_1 = require("../middlewares/storage");
const router = express_1.default.Router();
router.post('/create', formController_1.createForm);
router.get('/getAll', formController_1.getForms);
router.get('/getById/:id', formController_1.getFormById);
router.post('/upload', storage_1.upload.single('image'), formController_1.uploadPicture);
router.get('/user/:userId', formController_1.getUserImage);
exports.default = router;
