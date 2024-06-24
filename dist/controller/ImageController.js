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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserImages = exports.uploadImages = void 0;
const ImageModel_1 = __importDefault(require("../model/ImageModel"));
// example
// {
//     "userId": "j99vjks94093kf",
//     "file": [
//         { imageType: "national_id"},
//         { imageType: "licence"},
//         { imageType: "passport" }
//     ]
// }
const uploadImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, imageTypes } = req.body;
        if (!req.files || !Array.isArray(req.files)) {
            return res.status(400).send('No files uploaded.');
        }
        const files = req.files;
        const images = yield Promise.all(files.map((file, index) => __awaiter(void 0, void 0, void 0, function* () {
            const image = new ImageModel_1.default({
                userId,
                imageType: imageTypes[index],
                filename: file.originalname,
                contentType: file.mimetype,
                data: file.buffer
            });
            yield image.save();
            return image;
        })));
        return res.status(200).json(images);
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});
exports.uploadImages = uploadImages;
const getUserImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const images = yield ImageModel_1.default.find({ userId });
        res.status(200).json(images);
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});
exports.getUserImages = getUserImages;
