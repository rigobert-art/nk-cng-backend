"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        var uploadDir = 'uploads/personal';
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
var fileFilter = function (req, file, cb) {
    var ext = path_1.default.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.pdf') {
        cb(new Error('File type is not supported'));
    }
    else {
        cb(null, true);
    }
};
exports.uploadMiddleware = (0, multer_1.default)({ storage: storage, limits: { fileSize: 10000000 }, fileFilter: fileFilter }); //file size in bytes
