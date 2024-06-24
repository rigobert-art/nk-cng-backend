import { Request, Response } from 'express';
import mongoose from 'mongoose';
import guarantorModel from '../model/guarantorModel';
import multer, { StorageEngine } from 'multer';

// Configure multer storage
const storage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Multer middleware
export const upload = multer({ storage });

// Create a new guarantor
export const createGuarantor = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, phone } = req.body;
        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        if (!files || !files['nationalIdFront'] || !files['nationalIdBack'] || !files['letterFile']) {
            return res.status(400).json({ message: 'Missing required files' });
        }

        const nationalIdFront = files['nationalIdFront'][0];
        const nationalIdBack = files['nationalIdBack'][0];
        const letterFile = files['letterFile'][0];

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

// Get all guarantors
export const getGuarantors = async (req: Request, res: Response) => {
    try {
        const guarantors = await guarantorModel.find();
        res.status(200).json(guarantors);
    } catch (error) {
        console.error('Error fetching guarantors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a guarantor by ID
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
        console.error('Error fetching guarantor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Update a guarantor
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

// Delete a guarantor
export const deleteGuarantor = async (req: Request, res: Response) => {
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
