import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Image from "../model/ImageModel"
import { upload } from '../middlewares/storage';

// example
// {
//     "userId": "j99vjks94093kf",
//     "file": [
//         { imageType: "national_id"},
//         { imageType: "licence"},
//         { imageType: "passport" }
//     ]
// }
export const uploadImages = async (req: Request, res: Response) => {
        try {
            const { userId, imageTypes } = req.body;
            if (!req.files || !Array.isArray(req.files)) {
                return res.status(400).send('No files uploaded.');
            }

            const files = req.files as Express.Multer.File[];

            const images = await Promise.all(
                files.map(async (file, index) => {
                    const image = new Image({
                        userId,
                        imageType: imageTypes[index], // Assuming imageTypes is an array matching the order of files
                        filename: file.originalname,
                        contentType: file.mimetype,
                        data: file.buffer
                    });
                    await image.save();
                    return image;
                })
            );

            return res.status(200).json(images);
        } catch (error) {
            res.status(500).send({ message: "Internal server error" });
        }
}


export const getUserImages = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const images = await Image.find({ userId });

        res.status(200).json(images);
    } catch (error) {
        res.status(500).send({ message : "Internal server error"});
    }
};