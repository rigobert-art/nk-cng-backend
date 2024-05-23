// controllers/formController.ts
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Form from '../model/formModel';
import User from '../model/userModel';
import Image from "../model/ImageModel"

export const createForm = async (req: Request, res: Response) => {
    try {
        const {
            userId,
            firstName,
            lastName,
            phone,
            nationalId,
            address,
            region,
            zip,
            email,
        } = req.body;

        if( !firstName ||!lastName ||!phone ||!address ||!region ||!zip ||!email) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        // Validate user ID
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Check if user exists
        // const existingForm = await Form.findOne({ national_id: nationalId });
        // if (existingForm) {
        //     return res.status(400).json({ message: 'Form already exists' });
        // }

        // Create new form
        const newForm = new Form({
            User: userId,
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            national_id: nationalId,
            address: address,
            region: region,
            zip: zip,
            email: email,
        });

        const user = User.findByIdAndUpdate( userId, { is_form_submitted: true } )
        if (!user) {
            console.log('User not updated!!');
        }

        const savedForm = await newForm.save();
        res.status(201).json(savedForm);
    } catch (error) {
        console.error('Error creating form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getForms = async (req: Request, res: Response) => {
    try {
        const forms = await Form.find().sort({ createdAt: -1 });
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


export const uploadPicture = async (req: Request, res: Response) => {
    try {
        const { formId, imageType } = req.body;

        if (!formId || !imageType) {
            return res.status(400).send('User ID and image type are required.');
        }

        if (!mongoose.Types.ObjectId.isValid(formId)) {
            return res.status(400).json({ message: 'Invalid form ID' });
        }

        if (!req.file){
            return res.status(400).json({ message: 'No file uploaded' });
        }

       

        const newImage = new Image({
            Form: formId,
            imageType,
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            data: req.file.buffer
        });

        await newImage.save();
        res.status(201).send('Image uploaded successfully.');
       
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getUserImage = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        const images = await Image.find({ User: userId });
        res.status(200).json(images);
    } catch (error) {
        console.error('Error getting images:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}