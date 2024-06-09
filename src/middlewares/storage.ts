import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/personal')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+ '-' + file.originalname);
    },
});

export const uploadMiddleware = multer({ storage });
