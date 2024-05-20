// controllers/formController.ts
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Form from '../model/formModel';
import User from '../model/userModel';

export const createForm = async (req: Request, res: Response) => {
    try {
        const {
            // user,
            first_name,
            last_name,
            phone,
            // national_id,
            address,
            city,
            state,
            zip,
            email
        } = req.body;

        // Validate user ID
        // if (!mongoose.Types.ObjectId.isValid(user)) {
        //     return res.status(400).json({ message: 'Invalid user ID' });
        // }

        // Check if user exists
        // const existingUser = await User.findById(user);
        // if (!existingUser) {
        //     return res.status(404).json({ message: 'User not found' });
        // }

        // Create new form
        const newForm = new Form({
            // user,
            first_name,
            last_name,
            phone,
            email,
            address,
            city,
            state,
            zip,
            // passport
        });

        const savedForm = await newForm.save();
        res.status(201).json(savedForm);
    } catch (error) {
        console.error('Error creating form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getForms = async (req: Request, res: Response) => {
    try {
        const forms = await Form.find().populate('user').populate('passport');
        res.status(200).json(forms);
    } catch (error) {
        console.error('Error retrieving forms:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getFormById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Validate form ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid form ID' });
        }

        const form = await Form.findById(id).populate('user').populate('passport');

        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        res.status(200).json(form);
    } catch (error) {
        console.error('Error retrieving form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateForm = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Validate form ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid form ID' });
        }

        const updatedForm = await Form.findByIdAndUpdate(id, updateData, { new: true }).populate('user').populate('passport');

        if (!updatedForm) {
            return res.status(404).json({ message: 'Form not found' });
        }

        res.status(200).json(updatedForm);
    } catch (error) {
        console.error('Error updating form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteForm = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Validate form ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid form ID' });
        }

        const deletedForm = await Form.findByIdAndDelete(id);

        if (!deletedForm) {
            return res.status(404).json({ message: 'Form not found' });
        }

        res.status(200).json({ message: 'Form deleted successfully' });
    } catch (error) {
        console.error('Error deleting form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
