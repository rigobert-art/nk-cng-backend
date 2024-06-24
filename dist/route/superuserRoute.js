"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const superuserController_1 = require("../controller/superuserController");
const authenticate_1 = __importDefault(require("../middlewares/authenticate"));
const router = express_1.default.Router();
router.post('/register', superuserController_1.register);
router.post('/login', superuserController_1.login);
router.get('/logout', authenticate_1.default, (req, res) => {
    // Clear the token or do any other logout operations
    res.json({ message: 'Logged out successfully' });
});
exports.default = router;
