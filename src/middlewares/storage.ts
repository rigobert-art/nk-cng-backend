import { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/personal';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+ '-' + file.originalname);
    },

});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
    const ext = path.extname(file.originalname).toLowerCase();

    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.pdf') {
        cb(new Error('File type is not supported'));
    } else {
        cb(null, true);
    }
};

export const uploadMiddleware = multer({ storage, limits: { fileSize: 10000000}, fileFilter }); //file size in bytes
