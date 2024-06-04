import { Request, Response } from 'express';
import mongoose from 'mongoose';
import guarantorModel from '../model/guarantorModel';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

export const createGuarantor = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, phone } = req.body;
        const nationalIdFront = req.files['nationalIdFront'][0];
        const nationalIdBack = req.files['nationalIdBack'][0];
        const letterFile = req.files['letterFile'][0];

        const guarantor = new guarantorModel({
            firstName,
            lastName,
            email,
            phone,
            nationalIdFrontPath: nationalIdFront.path,
            nationalIdBackPath: nationalIdBack.path,
            letterFilePath: letterFile.path,
        });

        await guarantor.save();
        res.status(201).json(guarantor);
    } catch (error) {
        console.error('Error creating guarantor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getGuarantors = async (req: Request, res: Response) => {
    try {
        const guarantors = await guarantorModel.find();
        res.status(200).json(guarantors);
    } catch (error) {
        console.error('Error fetching guarantors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getGuarantorById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        const guarantor = await guarantorModel.findById(id);
        if (!guarantor) {
            return res.status(404).json({ message: 'Guarantor not found' });
        }
        res.status(200).json(guarantor);
    } catch (error) {
        console.error('Error fetching guarantors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateGuarantor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const guarantor = await guarantorModel.findByIdAndUpdate(id, updates, { new: true });
        if (!guarantor) {
            return res.status(404).json({ message: 'Guarantor not found' });
        }

        res.status(200).json(guarantor);
    } catch (error) {
        console.error('Error updating guarantor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteGuarantor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const guarantor = await guarantorModel.findByIdAndDelete(id);
        if (!guarantor) {
            return res.status(404).json({ message: 'Guarantor not found' });
        }

        res.status(200).json({ message: 'Guarantor deleted successfully' });
    } catch (error) {
        console.error('Error deleting guarantor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
