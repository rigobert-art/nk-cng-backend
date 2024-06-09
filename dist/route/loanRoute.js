"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loanController_1 = require("../controller/loanController");
const router = express_1.default.Router();
// router.post('/create', createLoan);
router.get('/get', loanController_1.getLoanById);
router.get('/getAll', loanController_1.getAllLoans);
// router.post('/set', setLoan);
router.put('/update:id', loanController_1.updateLoanById);
router.delete('/delete:id', loanController_1.deleteLoanById);
exports.default = router;
