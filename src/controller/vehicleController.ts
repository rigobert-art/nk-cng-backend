import { Request, Response } from 'express';
import mongoose from 'mongoose';
import vehicleModel from '../model/vehicleModel';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const upload = multer({ storage });

export const createVehicle = async (req: Request, res: Response) => {
    try {
        const { make, model, year, vin, color } = req.body;
        const registrationCard = req.file;

        if (!registrationCard) {
            return res.status(400).json({ message: 'Registration card file is required' });
        }

        const vehicle = new vehicleModel({
            make,
            model,
            year,
            vin,
            color,
            registrationCardPath: registrationCard.path,
        });

        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (error) {
        console.error('Error creating vehicle:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getVehicles = async (req: Request, res: Response) => {
    try {
        const vehicles = await vehicleModel.find();
        res.status(200).json(vehicles);
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getVehicleById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        const vehicle = await vehicleModel.findById(id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        console.error('Error fetching vehicle:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateVehicle = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const vehicle = await vehicleModel.findByIdAndUpdate(id, updates, { new: true });
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.status(200).json(vehicle);
    } catch (error) {
        console.error('Error updating vehicle:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteVehicle = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const vehicle = await vehicleModel.findByIdAndDelete(id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

