"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var superuserController_1 = require("../controller/superuserController");
var authenticate_1 = __importDefault(require("../middlewares/authenticate"));
var router = express_1.default.Router();
router.post('/register', superuserController_1.register);
router.post('/login', superuserController_1.login);
router.get('/logout', authenticate_1.default, function (req, res) {
    // Clear the token or do any other logout operations
    res.json({ message: 'Logged out successfully' });
});
exports.default = router;
